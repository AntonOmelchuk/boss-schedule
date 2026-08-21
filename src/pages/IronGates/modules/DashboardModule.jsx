import {
  Award,
  Calendar,
  ChevronRight,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

import { STORAGE_URL } from "../../../constants/general";
import StatCard from "../components/Dashboard/StatCard";

const CP_STATS = {
  totalMembers: 10,
  totalEvents: 42,
  totalPoints: 1245.6,
  avgAttendance: "94.2%",
  acquiredEpics: 14,
  lastEvent: {
    name: "ZAKEN",
    date: "19.08.2026",
    attendance: "8 / 10 members",
    points: "+4.0 CP points",
  },
  currentPriority: {
    epic: "Valakas",
    leader: "ManiacShrek",
    points: 73.7,
  },
};

const TOP_PRIORITY_LIST = [
  {
    rank: 1,
    name: "ManiacShrek",
    class: "Necromancer",
    role: "1st DoD / DD",
    points: 73.7,
    tier: "HIGH",
    avatar: `${STORAGE_URL}/avatars/shrek.png`,
  },
  {
    rank: 2,
    name: "ZukkaDaddy",
    class: "Cardinal",
    role: "Bishop / Main Heal",
    points: 57.7,
    tier: "HIGH",
    avatar: `${STORAGE_URL}/avatars/Zukka.png`,
  },
  {
    rank: 3,
    name: "WINSON",
    class: "Storm Screamer",
    role: "Mage / AoE",
    points: 56.3,
    tier: "MID",
    avatar: `${STORAGE_URL}/avatars/Winson.png`,
  },
  {
    rank: 4,
    name: "Fergi",
    class: "Cardinal",
    role: "Priority Heal",
    points: 49.3,
    tier: "MID",
    avatar: `${STORAGE_URL}/avatars/fergi.png`,
  },
];

const RECENT_MEMBERS = [
  {
    name: "VRYO",
    role: "Caller / Mage",
    class: "Mystic Muse",
    points: 114.8,
    balance: -185.2,
    avatar: `${STORAGE_URL}/avatars/Vryo.png`,
  },
  {
    name: "Fergi",
    role: "Priority Heal",
    class: "Cardinal",
    points: 98.2,
    balance: +45.0,
    avatar: `${STORAGE_URL}/avatars/fergi.png`,
  },
  {
    name: "Spektra",
    role: "Priority Heal",
    class: "Cardinal",
    points: 95.0,
    balance: +30.5,
    avatar: `${STORAGE_URL}/avatars/spektra.png`,
  },
  {
    name: "ManiacShrek",
    role: "1st DoD / DD",
    class: "Necromancer",
    points: 92.4,
    balance: -120.0,
    avatar: `${STORAGE_URL}/avatars/shrek.png`,
  },
];

const DashboardModule = () => {
  return (
    <div className="p-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          title="Склад CP"
          value={CP_STATS.totalMembers}
          unit="fighters"
          icon={Users}
          footerIcon={Calendar}
          footerLabel="Всього подій:"
          footerValue={CP_STATS.totalEvents}
        />

        <StatCard
          title="Сумарні очки CP"
          value={CP_STATS.totalPoints}
          unit="pts"
          icon={TrendingUp}
          colorClass="amber"
          footerLabel="Середня відвідуваність:"
          footerValue={CP_STATS.avgAttendance}
          footerHighlight
        />

        <StatCard
          title="Отримано Епіків"
          value={CP_STATS.acquiredEpics}
          unit="items"
          icon={Award}
          colorClass="indigo"
          footerLabel={`Останній: ${CP_STATS.lastEvent.name}`}
          footerValue={CP_STATS.lastEvent.date}
        />

        <StatCard
          title="Наступний Епік"
          value={CP_STATS.currentPriority.epic}
          unit=""
          icon={Zap}
          colorClass="amber"
          highlight
          footerLabel={`Час: 20:00`}
          footerValue={`Дата: 23.08.2026`}
          footerHighlight
        />
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md flex
          flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                Epic Priority Top
              </h2>
              <span
                className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2.5 py-1
                rounded-full font-medium"
              >
                HIGH TIER
              </span>
            </div>

            <div className="space-y-3">
              {TOP_PRIORITY_LIST.map((item) => (
                <div
                  key={item.rank}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-950/50 border border-slate-800/60
                  hover:border-amber-500/30 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="relative w-9 h-9 rounded-full p-[1.5px] bg-gradient-to-tr from-amber-500
                      to-purple-600 shrink-0"
                    >
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-full bg-slate-900"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">{item.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-extrabold text-amber-400">
                      {item.points}
                    </span>
                    <span className="block text-[10px] text-slate-500 uppercase">
                      pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full mt-6 py-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60
            rounded-xl text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2
            group"
          >
            <span>Відкрити повний Epic Priority</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Права колонка (2/3): Швидкий перегляд учасників з ролями та локальними аватарами */}
        <div
          className="lg:col-span-2 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-md
          flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Active CP Roster & Roles
              </h2>
              <span className="text-xs text-slate-400">
                Показано топ активних
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RECENT_MEMBERS.map((member, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/60
                    hover:border-purple-500/40 transition-all group cursor-pointer"
                >
                  <div
                    className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 to-purple-600
                    shrink-0"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full bg-slate-900"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center justify-between">
                      <h4
                        className="text-sm font-bold text-white truncate group-hover:text-amber-400
                        transition-colors"
                      >
                        {member.name}
                      </h4>
                      <span
                        className={`text-xs font-bold ${member.balance < 0 ? "text-red-400" : "text-emerald-400"}`}
                      >
                        {member.balance > 0
                          ? `+${member.balance}`
                          : member.balance}
                      </span>
                    </div>
                    <p className="text-xs text-purple-300 font-medium truncate">
                      {member.role}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-slate-400">
                        {member.class}
                      </span>
                      <span className="text-[11px] font-semibold text-amber-400/90">
                        {member.points} pts
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="w-full mt-6 py-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-xs
              rounded-xl font-semibold text-slate-300 transition-all flex items-center justify-center gap-2 group"
          >
            <span>Переглянути всіх членів пачки та профілі</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardModule;
