import {
  Award,
  Calendar,
  ChevronRight,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

// Імпорт аватарок учасників згідно з ТЗ
import fergiImage from "../../assets/ig-avatars/fergi.png";
// import lapestoImage from "../../assets/ig-avatars/Lapesto.png";
// import manolImage from "../../assets/ig-avatars/Manol.png";
import shrekImage from "../../assets/ig-avatars/shrek.png";
import spektraImage from "../../assets/ig-avatars/spektra.png";
// import tobeImage from "../../assets/ig-avatars/tobe.png";
// import tomImage from "../../assets/ig-avatars/Tom.png";
import vryoImage from "../../assets/ig-avatars/Vryo.png";
import winsonImage from "../../assets/ig-avatars/Winson.png";
import zukkaImage from "../../assets/ig-avatars/Zukka.png";

// Повні мокові дані з усіма показниками згідно з ТЗ
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
    avatar: shrekImage,
  },
  {
    rank: 2,
    name: "ZukkaDaddy",
    class: "Cardinal",
    role: "Bishop / Main Heal",
    points: 57.7,
    tier: "HIGH",
    avatar: zukkaImage,
  },
  {
    rank: 3,
    name: "WINSON",
    class: "Storm Screamer",
    role: "Mage / AoE",
    points: 56.3,
    tier: "MID",
    avatar: winsonImage,
  },
  {
    rank: 4,
    name: "Fergi",
    class: "Cardinal",
    role: "Priority Heal",
    points: 49.3,
    tier: "MID",
    avatar: fergiImage,
  },
];

const RECENT_MEMBERS = [
  {
    name: "VRYO",
    role: "Caller / Mage",
    class: "Mystic Muse",
    points: 114.8,
    balance: -185.2,
    avatar: vryoImage,
  },
  {
    name: "Fergi",
    role: "Priority Heal",
    class: "Cardinal",
    points: 98.2,
    balance: +45.0,
    avatar: fergiImage,
  },
  {
    name: "Spektra",
    role: "Priority Heal",
    class: "Cardinal",
    points: 95.0,
    balance: +30.5,
    avatar: spektraImage,
  },
  {
    name: "ManiacShrek",
    role: "1st DoD / DD",
    class: "Necromancer",
    points: 92.4,
    balance: -120.0,
    avatar: shrekImage,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10 font-sans">
      {/* 1. ВЕЛИКИЙ ЗАГОЛОВОК ЗГІДНО З ТЗ */}
      <header className="mb-10 text-center relative">
        <div
          className="absolute inset-0
          bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1)_0%,transparent_70%)]
          pointer-events-none blur-2xl"
        />
        <h1
          className="text-4xl lg:text-6xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-purple-300
        to-indigo-400 bg-clip-text text-transparent uppercase drop-shadow-[0_0_25px_rgba(245,158,11,0.3)]"
        >
          Iron Gates
        </h1>
        <p className="text-sm lg:text-base text-amber-500/80 font-semibold tracking-widest uppercase mt-2">
          CP Activity & Epic Distribution
        </p>
      </header>

      {/* 2. ПОВНА СВОДКА ПО CP (УСІ 7 ПОКАЗНИКІВ ЗГІДНО З ТЗ) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {/* Показник 1 & 2: Кількість членів CP + Загальна кількість подій */}
        <div
          className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-lg
          relative overflow-hidden group hover:border-amber-500/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-medium">
                Склад CP
              </p>
              <h3 className="text-2xl font-bold text-white mt-1">
                {CP_STATS.totalMembers}{" "}
                <span className="text-xs text-purple-400 font-normal">
                  fighters
                </span>
              </h3>
            </div>
            <div
              className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center
              justify-center text-purple-400"
            >
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>
              Всього подій:{" "}
              <strong className="text-slate-200">{CP_STATS.totalEvents}</strong>
            </span>
          </div>
        </div>

        {/* Показник 3 & 4: Суммарні очки групи + Середня відвідуваність */}
        <div
          className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-lg
          relative overflow-hidden group hover:border-amber-500/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-medium">
                Сумарні очки CP
              </p>
              <h3 className="text-2xl font-bold text-amber-400 mt-1">
                {CP_STATS.totalPoints}{" "}
                <span className="text-xs text-slate-400 font-normal">pts</span>
              </h3>
            </div>
            <div
              className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center
              justify-center text-amber-400"
            >
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center gap-1.5">
            <span>
              Середня відвідуваність:{" "}
              <strong className="text-emerald-400">
                {CP_STATS.avgAttendance}
              </strong>
            </span>
          </div>
        </div>

        {/* Показник 5 & 6: Кількість отриманих епіків + Останній зіграний івент */}
        <div
          className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-md shadow-lg
          relative overflow-hidden group hover:border-amber-500/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 uppercase font-medium">
                Отримано Епіків
              </p>
              <h3 className="text-2xl font-bold text-indigo-400 mt-1">
                {CP_STATS.acquiredEpics}{" "}
                <span className="text-xs text-slate-400 font-normal">
                  items
                </span>
              </h3>
            </div>
            <div
              className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center
              justify-center text-indigo-400"
            >
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
            <span>
              Останній івент:{" "}
              <strong className="text-slate-200">
                {CP_STATS.lastEvent.name}
              </strong>
            </span>
            <span className="text-slate-500">{CP_STATS.lastEvent.date}</span>
          </div>
        </div>

        {/* Показник 7: Поточний пріоритет на наступний епік */}
        <div
          className="bg-gradient-to-br from-amber-500/10 via-slate-900/80 to-purple-950/40 border
          border-amber-500/30 rounded-2xl p-5 backdrop-blur-md shadow-lg relative overflow-hidden group"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-400 uppercase font-semibold">
                Наступний Епік
              </p>
              <h3 className="text-xl font-bold text-white mt-1">
                {CP_STATS.currentPriority.epic}
              </h3>
            </div>
            <div
              className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center
              justify-center text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
            >
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 text-xs text-slate-300 flex items-center justify-between">
            <span>
              Топ претендент:{" "}
              <strong className="text-amber-400">
                {CP_STATS.currentPriority.leader}
              </strong>
            </span>
            <span className="text-purple-300 font-bold">
              {CP_STATS.currentPriority.points} pts
            </span>
          </div>
        </div>
      </section>

      {/* 3. ОСНОВНИЙ КОНТЕНТ (2 КОЛОНКИ: ПРІОРИТЕТИ ТА АКТИВНІСТЬ УЧАСНИКІВ З АВАТАРКАМИ) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ліва колонка (1/3): Epic Priority блок */}
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
            className="w-full mt-6 py-2.5 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60
            rounded-xl text-xs font-semibold text-slate-300 transition-all flex items-center justify-center gap-2
            group"
          >
            <span>Переглянути всіх членів пачки та профілі</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
