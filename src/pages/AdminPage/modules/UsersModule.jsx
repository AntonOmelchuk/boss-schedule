import { onValue, ref, update } from "firebase/database";
import { useEffect, useMemo, useState } from "react";

import { ROLES_LIST } from "../../../constants/roles";
import useTranslation from "../../../hooks/useTranslation";
import { db } from "../../../services/firebase";
import {
  AnomalyBadge,
  PaginationBar,
  SearchInput,
  SelectFilter,
} from "../components/UsersComponents";

const ITEMS_PER_PAGE = 10;

const UsersModule = () => {
  const { t } = useTranslation();

  const [usersMap, setUsersMap] = useState({});
  const [cpListKeys, setCpListKeys] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [cpFilter, setCpFilter] = useState("ALL");
  const [anomalyFilter, setAnomalyFilter] = useState("ALL");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Listen to Realtime DB updates
  useEffect(() => {
    const usersRef = ref(db, "users");
    const cpListRef = ref(db, "cp_list");

    const unsubUsers = onValue(usersRef, (snapshot) => {
      setUsersMap(snapshot.val() || {});
      setLoading(false);
    });

    const unsubCps = onValue(cpListRef, (snapshot) => {
      const data = snapshot.val() || {};
      setCpListKeys(Object.keys(data));
    });

    return () => {
      unsubUsers();
      unsubCps();
    };
  }, []);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, roleFilter, cpFilter, anomalyFilter]);

  const usersList = useMemo(() => {
    return Object.entries(usersMap).map(([id, u]) => ({
      ...u,
      discord_id: u.discord_id || id,
    }));
  }, [usersMap]);

  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (u.char_name && u.char_name.toLowerCase().includes(q)) ||
        (u.cp_name && u.cp_name.toLowerCase().includes(q)) ||
        (u.username && u.username.toLowerCase().includes(q)) ||
        (u.discord_id && u.discord_id.toLowerCase().includes(q));

      const matchesRole = roleFilter === "ALL" || u.role === roleFilter;
      const matchesCp = cpFilter === "ALL" || u.cp_name === cpFilter;

      let matchesAnomaly = true;
      const ipCount = u.IPlist ? u.IPlist.length : 0;
      const deviceCount = u.devicesList ? u.devicesList.length : 0;

      if (anomalyFilter === "MULTI_IP") matchesAnomaly = ipCount > 1;
      if (anomalyFilter === "MULTI_DEVICE") matchesAnomaly = deviceCount > 1;
      if (anomalyFilter === "ANY_ANOMALY")
        matchesAnomaly = ipCount > 1 || deviceCount > 1;

      return matchesSearch && matchesRole && matchesCp && matchesAnomaly;
    });
  }, [usersList, searchTerm, roleFilter, cpFilter, anomalyFilter]);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredUsers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredUsers, currentPage]);

  const handleUpdateUserField = async (discordId, field, value) => {
    try {
      await update(ref(db, `users/${discordId}`), {
        [field]: value,
        updated_at: Date.now(),
      });
    } catch (err) {
      console.error(`Failed to update user ${field}:`, err);
    }
  };

  const anomalyOptions = useMemo(
    () => [
      { value: "ANY_ANOMALY", label: t.admin.users.filterAnyAnomaly },
      { value: "MULTI_IP", label: t.admin.users.filterMultiIp },
      { value: "MULTI_DEVICE", label: t.admin.users.filterMultiDevice },
    ],
    [t],
  );

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center p-12 bg-slate-900 border border-slate-800
        rounded-2xl gap-3"
      >
        <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-semibold text-slate-400">
          {t.admin.users.loadingUsers}
        </span>
      </div>
    );
  }

  const isFiltered =
    searchTerm ||
    roleFilter !== "ALL" ||
    cpFilter !== "ALL" ||
    anomalyFilter !== "ALL";

  return (
    <div className="space-y-4">
      {/* Search & Filters Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
            placeholder={t.admin.users.searchPlaceholder}
          />

          <SelectFilter
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            options={ROLES_LIST}
            defaultOptionLabel={t.admin.users.filterAllRoles}
          />

          <SelectFilter
            value={cpFilter}
            onChange={(e) => setCpFilter(e.target.value)}
            options={cpListKeys}
            defaultOptionLabel={t.admin.users.filterAllCps}
          />

          <SelectFilter
            value={anomalyFilter}
            onChange={(e) => setAnomalyFilter(e.target.value)}
            options={anomalyOptions}
            defaultOptionLabel={t.admin.users.filterAllAnomalies}
          />
        </div>

        {/* Counter Badge */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/60">
          <span>
            {t.admin.users.foundCount}:{" "}
            <strong className="text-amber-400">{filteredUsers.length}</strong> /{" "}
            {usersList.length}
          </span>
          {isFiltered && (
            <button
              onClick={() => {
                setSearchTerm("");
                setRoleFilter("ALL");
                setCpFilter("ALL");
                setAnomalyFilter("ALL");
              }}
              className="text-amber-400 hover:underline cursor-pointer"
            >
              {t.admin.users.resetFilters}
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead
              className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase
              tracking-wider text-[10px]"
            >
              <tr>
                <th className="py-3 px-4">{t.admin.users.colUser}</th>
                <th className="py-3 px-4">{t.admin.users.colCharacter}</th>
                <th className="py-3 px-4">{t.admin.users.colCp}</th>
                <th className="py-3 px-4">{t.admin.users.colRole}</th>
                <th className="py-3 px-4">{t.admin.users.colIpDevices}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((u) => {
                  const ipCount = u.IPlist ? u.IPlist.length : 0;
                  const deviceCount = u.devicesList ? u.devicesList.length : 0;
                  const hasAnomaly = ipCount > 1 || deviceCount > 1;

                  return (
                    <tr
                      key={u.discord_id}
                      className="hover:bg-slate-800/40 transition"
                    >
                      {/* Discord User Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={
                              u.avatar_url ||
                              "https://cdn.discordapp.com/embed/avatars/0.png"
                            }
                            alt="avatar"
                            className="w-8 h-8 rounded-full border border-slate-700"
                          />
                          <div className="flex flex-col">
                            <span className="font-bold text-white">
                              {u.username || "—"}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {u.discord_id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Character Name */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-amber-400">
                          {u.char_name || "—"}
                        </span>
                      </td>

                      {/* CP Select */}
                      <td className="py-3 px-4">
                        <SelectFilter
                          value={u.cp_name || ""}
                          onChange={(e) =>
                            handleUpdateUserField(
                              u.discord_id,
                              "cp_name",
                              e.target.value,
                            )
                          }
                          options={cpListKeys}
                          defaultOptionLabel=""
                          className="py-1 px-2 text-slate-200"
                        />
                      </td>

                      {/* Role Select */}
                      <td className="py-3 px-4">
                        <SelectFilter
                          value={u.role || "MEMBER"}
                          onChange={(e) =>
                            handleUpdateUserField(
                              u.discord_id,
                              "role",
                              e.target.value,
                            )
                          }
                          options={ROLES_LIST}
                          defaultOptionLabel=""
                          className="py-1 px-2 font-semibold text-amber-400"
                        />
                      </td>

                      {/* Anomaly Badges */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <AnomalyBadge
                            count={ipCount}
                            icon="🌐"
                            isDanger={ipCount > 1}
                            title={`IPs: ${u.IPlist ? u.IPlist.join(", ") : "—"}`}
                          />
                          <AnomalyBadge
                            count={deviceCount}
                            icon="💻"
                            isDanger={deviceCount > 1}
                            title={`Devices: ${u.devicesList ? u.devicesList.join(" | ") : "—"}`}
                          />
                          {hasAnomaly && (
                            <span
                              className="text-amber-400 text-xs cursor-help"
                              title={t.admin.users.anomalyTooltip}
                            >
                              ⚠️
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="py-8 text-center text-xs text-slate-500"
                  >
                    {t.admin.users.noUsersFound}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <PaginationBar
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            labels={{
              prevPage: t.admin.users.prevPage,
              nextPage: t.admin.users.nextPage,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsersModule;
