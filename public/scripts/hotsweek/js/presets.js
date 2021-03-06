//将Level_count等字段中的对象转为数组
var object_to_array = function (object) {
  var arr = [];
  for (var i in Object.keys(object)) {
    arr.push(Object.keys(object)[i]);
  }
  return arr;
}
var timestamptotime = function (time) {
  var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + "-";
  var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  var D = date.getDate()< 10 ? "0" + date.getDate() + "  " : date.getDate()+ " ";
  var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

var counter = {
  "WeekBasic": function () {
    var Time = Math.round(dataPersonal.PlayerBase.game_length.sum / 60)
    var Games = dataPersonal.PlayerBase.game_total.sum
    var Win = dataPersonal.PlayerBase.game_win.sum
    var WinRate = Games ? (Win / Games * 100).toFixed(2) : 0;
    var res = [
      [
        ["Plays", Games + " times"],
        ["Length", Time + " mins"],
        ["Win", Win + " times"],
        ["Win Rate", WinRate + "%"],
      ],
      [
        ["游戏场次", Games + " 局"],
        ["游戏时长", Time + " 分钟"],
        ["胜利场次", Win + " 局"],
        ["本周胜率", WinRate + "%"],
      ]
    ]
    return res[lang]
  },
  "WeekGlobalBasic": function () {
    var Time = Math.round(dataGlobal.PlayerBase.game_length.sum / 10 / 60)
    var Games = Math.round(dataGlobal.PlayerBase.game_total.sum / 10)
    var res = [
      [
        ["Global Plays", Games + " times"],
        ["Global Length", Time + " mins"],
      ],
      [
        ["全球游戏场次", Games + " 局"],
        ["全球游戏时长", Time + " 分钟"],
      ]
    ]
    return res[lang]
  },
  "WeekMostUsed": function () {
    var HeroID = dataPersonal.PlayerHeroes._sumMax.game_total[0]
    var HeroInf = getHeroInf(HeroID)
    var res = [
      [
        ["Most Used", HeroInf.name_en],
        [HeroInf.name_en + " Plays", HeroInf.Play + " times"],
        [HeroInf.name_en + " Length", HeroInf.Length + " mins"],
        [HeroInf.name_en + " Win", HeroInf.Win + " times"],
        [HeroInf.name_en + " Winrate", HeroInf.WinRate + "%"],
      ],
      [
        ["最常使用", HeroInf.name_cn],
        [HeroInf.name_cn + "场次", HeroInf.Play + " 次"],
        [HeroInf.name_cn + "时长", HeroInf.Length + " 分钟"],
        [HeroInf.name_cn + "获胜", HeroInf.Win + " 次"],
        [HeroInf.name_cn + "胜率", HeroInf.WinRate + "%"],
      ],
    ]
    return res[lang]
  },
  "WeekGlobalMostUsed": function () {
    var HeroID = dataGlobal.PlayerHeroes._sumMax.game_total[0]
    var HeroInf = getHeroInf(HeroID)
    var res = [
      [
        ["Most Used", HeroInf.name_en],
        [HeroInf.name_en + " Plays", HeroInf.GlobalPlay + " times"],
        [HeroInf.name_en + " Length", HeroInf.GlobalLength + " mins"],
        [HeroInf.name_en + " Win", HeroInf.GlobalWin + " times"],
        [HeroInf.name_en + " Winrate", HeroInf.GlobalWinRate + "%"],
      ],
      [
        ["全球最常使用", HeroInf.name_cn],
        [HeroInf.name_cn + "场次", HeroInf.GlobalPlay + " 次"],
        [HeroInf.name_cn + "时长", HeroInf.GlobalLength + " 分钟"],
        [HeroInf.name_cn + "获胜", HeroInf.GlobalWin + " 次"],
        [HeroInf.name_cn + "胜率", HeroInf.GlobalWinRate + "%"],
      ],
    ]
    return res[lang]
  },
  "WeekGlobalHighestWinRate": function () {
    var highestWinRate = 0
    var highestHero = ''
    for (var HeroID in dataGlobal.PlayerHeroes) {
      var HeroInf = getHeroInf(HeroID)
      if (!HeroInf) continue
      var winRate = HeroInf.GlobalWinRate
      if (winRate > highestWinRate) {
        highestWinRate = winRate
        highestHero = HeroInf
      }
    }
    var res = [
      [
        ["First Win Rate", highestHero.name_en],
        [highestHero.name_en + " Winrate", highestHero.GlobalWinRate + "%"],
      ],
      [
        ["全球最高胜率", highestHero.name_cn],
        [highestHero.name_cn + "胜率", highestHero.GlobalWinRate + "%"],
      ],
    ]
    return res[lang]
  },
  "WeekQuickMatch_length": function () {
    var Time = Math.round(dataPersonal.PlayerBase.game_length_QuickMatch.sum / 60)
    var res = [
      [
        ["Quick Match Length", Time + " minutes"],
      ],
      [
        ["快速比赛时长", Time + " 分钟"],
      ],
    ]
    return res[lang]
  },
  "week_QuickMatch_avg_length": function () {
    var Time = dataPersonal.PlayerBase.game_length_QuickMatch.sum
    var Count = dataPersonal.PlayerBase.game_total_QuickMatch.sum
    var res = [
      [
        ["Quick Match Avg Length", Count > 0 ? ((Time / 60) / Count).toFixed(0) + " mins" : ''],
      ],
      [
        ["快速比赛平均时长", Count > 0 ? ((Time / 60) / Count).toFixed(0) + " 分钟" : ''],
      ],
    ]
    return res[lang]
  },
  "week_HeroLeague_length": function () {
    var Time = Math.round(dataPersonal.PlayerBase.game_length_HeroLeague.sum / 60)
    var res = [
      [
        ["Hero League Length", Time + " mins"],
      ],
      [
        ["英雄联赛时长", Time + " 分钟"],
      ],
    ]
    return res[lang]
  },
  "week_HeroLeague_avg_length": function () {
    var Time = dataPersonal.PlayerBase.game_length_HeroLeague.sum / 60
    var Games = dataPersonal.PlayerBase.game_total_HeroLeague.sum
    var res = [
      [
        ["Hero League Avg Length", Games > 0 ? (Time / Games).toFixed(0) + " mins" : ''],
      ],
      [
        ["英雄联赛平均时长", Games > 0 ? (Time / Games).toFixed(0) + " 分钟" : ''],
      ],
    ]
    return res[lang]
  },
  "week_TeamLeague_length": function () {
    var Time = Math.round(dataPersonal.PlayerBase.game_length_TeamLeague.sum / 60)
    var res = [
      [
        ["Team League Length", Time + " mins"],
      ],
      [
        ["团队联赛时长", Time + " 分钟"],
      ],
    ]
    return res[lang]
  },
  "week_TeamLeague_avg_length": function () {
    var Time = dataPersonal.PlayerBase.game_length_TeamLeague.sum
    var Games = dataPersonal.PlayerBase.game_total_TeamLeague.sum
    var res = [
      [
        ["Team League Avg Length", Games > 0 ? (Time / Games / 60).toFixed(0) + " mins" : ''],
      ],
      [
        ["团队联赛平均时长", Games > 0 ? (Time / Games / 60).toFixed(0) + " 分钟" : ''],
      ],
    ]
    return res[lang]
  },
  "week_UnrankedDraft_length": function () {
    var Time = Math.round(dataPersonal.PlayerBase.game_length_UnrankedDraft.sum / 60)
    var res = [
      [
        ["Unranked Draft Length", Time + " mins"],
      ],
      [
        ["非排名模式时长", Time + " 分钟"],
      ],
    ]
    return res[lang]
  },
  "week_UnrankedDraft_avg_length": function () {
    var Time = dataPersonal.PlayerBase.game_length_UnrankedDraft.sum
    var Games = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
    var res = [
      [
        ["Unranked Draft Avg Length", Games > 0 ? (Time / Games / 60).toFixed(0) + " mins" : ''],
      ],
      [
        ["非排名模式平均时长", Games > 0 ? (Time / Games / 60).toFixed(0) + " 分钟" : ''],
      ],
    ]
    return res[lang]
  },
  "WeekQuickMatch_total": function () {
    var Games = dataPersonal.PlayerBase.game_total_QuickMatch.sum
    var res = [
      [
        ["Quick Match Total", Games + " times"],
      ],
      [
        ["快速比赛总场次", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekHeroLeague_total": function () {
    var Games = dataPersonal.PlayerBase.game_total_HeroLeague.sum
    var res = [
      [
        ["Hero League Total", Games + " times"]
      ],
      [
        ["英雄联赛总场次", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekTeamLeague_total": function () {
    var Games = dataPersonal.PlayerBase.game_total_TeamLeague.sum
    var res = [
      [
        ["Team League Total", Games + " times"]
      ],
      [
        ["团队联赛总场次", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekUnrankedDraft_total": function () {
    var Games = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
    var res = [
      [
        ["Unranked Draft Total", Games + " times"]
      ],
      [
        ["非排名模式总场次", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekQuickMatch_win": function () {
    var Win = dataPersonal.PlayerBase.game_win_QuickMatch.sum
    var res = [
      [
        ["Quick Match Win", Win + " times"]
      ],
      [
        ["快速比赛胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekHeroLeague_win": function () {
    var Win = dataPersonal.PlayerBase.game_win_HeroLeague.sum
    var res = [
      [
        ["Hero League Win", Win + " times"]
      ],
      [
        ["英雄联赛胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekTeamLeague_win": function () {
    var Win = dataPersonal.PlayerBase.game_win_TeamLeague.sum
    var res = [
      [
        ["Team League Win", Win + " times"]
      ],
      [
        ["团队联赛胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekUnrankedDraft_win": function () {
    var Win = dataPersonal.PlayerBase.game_win_UnrankedDraft.sum
    var res = [
      [
        ["Unranked Draft Win", Win + " times"]
      ],
      [
        ["非排名模式胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekQuickMatch_win_rate": function () {
    var Win = dataPersonal.PlayerBase.game_win_QuickMatch.sum
    var Games = dataPersonal.PlayerBase.game_total_QuickMatch.sum

    var res = [
      [
        ["Quick Match Win Rate", Games > 0 ? ((Win / Games).toFixed(2) * 100 + "%") : '']
      ],
      [
        ["快速比赛胜率", Games > 0 ? ((Win / Games).toFixed(2) * 100 + "%") : '']
      ],
    ]

    return res[lang]
  },
  "WeekHeroLeague_win_rate": function () {
    var Win = dataPersonal.PlayerBase.game_win_HeroLeague.sum
    var Games = dataPersonal.PlayerBase.game_total_HeroLeague.sum
    var res = [
      [
        ["Hero League Wins Rate", Games > 0 ? (Win / Games).toFixed(2) * 100 + "%" : '']
      ],
      [
        ["英雄联赛胜率", Games > 0 ? (Win / Games).toFixed(2) * 100 + "%" : '']
      ]
    ]
    return res[lang]
  },
  "WeekTeamLeague_win_rate": function () {
    var Win = dataPersonal.PlayerBase.game_win_TeamLeague.sum
    var Games = dataPersonal.PlayerBase.game_total_TeamLeague.sum
    var res = [
      [
        ["Team League Win Rate", Games > 0 ? (Win / Games).toFixed(2) * 100 + "%" : '']
      ],
      [
        ["团队联赛胜率", Games > 0 ? (Win / Games).toFixed(2) * 100 + "%" : '']
      ]
    ]
    return res[lang]
  },
  "WeekUnrankedDraft_win_ate": function () {
    var Win = dataPersonal.PlayerBase.game_win_UnrankedDraft.sum
    var Games = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
    var res = [
      [
        ["Unranked Draft Win Rate", Games > 0 ? (Win / Games).toFixed(2) * 100 + "%" : '']
      ],
      [
        ["非排名模式胜率", Games > 0 ? (Win / Games).toFixed(2) * 100 + "%" : '']
      ]
    ]
    return res[lang]
  },
  "week_party_total": function () {
    var Times = dataPersonal.PlayerBase.party_total.sum
    var res = [
      [
        ["Premades total", Times + " times"]
      ],
      [
        ["开黑次数", Times + " 局"]
      ]
    ]
    return res[lang]
  },
  //1-2
  "week_party_win": function () {
    var Times = dataPersonal.PlayerBase.party_win.sum
    var res = [
      [
        ["Premades win", Times + " times"]
      ],
      [
        ["开黑获胜次数", Times + " 局"]
      ]
    ]
    return res[lang]
  },
  "week_party_win_rate": function () {
    var Win = dataPersonal.PlayerBase.party_win.sum
    var Games = dataPersonal.PlayerBase.party_total.sum
    var res = [
      [
        ["Premade Win Rate", Games > 0 ? (Win / Games * 100).toFixed(2) + "%" : '']
      ],
      [
        ["开黑胜率", Games > 0 ? (Win / Games * 100).toFixed(2) + "%" : '']
      ]
    ]
    return res[lang]
  },
  "week_team1_count": function () {
    var Times = dataPersonal.PlayerBase.team1_count.sum
    var res = [
      [
        ["Played In Team 1", Times + " times"]
      ],
      [
        ["在右上方的游戏次数", Times + " 次"]
      ]
    ]

    return res[lang]
  },
  "week_level": function () {
    var Sum = dataPersonal.PlayerBase.Level.sum
    var Games = dataPersonal.PlayerBase.game_total.sum
    if (Games <= 0)
      return false;
    var Level = Sum / Games;
    var res = [
      [
        ["Average Level", Level.toFixed(0)]
      ],
      [
        ["平均等级(游戏结束时)", Level.toFixed(0) + " 级"]
      ]
    ]

    return res[lang]
  },
  "week_take_downs": function () {
    var Times = dataPersonal.PlayerBase.Takedowns.sum
    var res = [
      [
        ["Take Downs", Times + " times"]
      ],
      [
        ["总参与击杀", Times + " 次"]
      ]
    ]

    return res[lang]
  },
  "week_solo_kills": function () {
    var Times = dataPersonal.PlayerBase.SoloKills.sum
    var res = [
      [
        ["Solo Kills", Times + " times"]
      ],
      [
        ["最后一击", Times + " 次"]
      ]
    ]

    return res[lang]
  },
  "week_assists": function () {
    var Times = dataPersonal.PlayerBase.Assists.sum
    var res = [
      [
        ["Assists", Times + " times"]
      ],
      [
        ["助攻", Times + " 次"]
      ]
    ]

    return res[lang]
  },
  "week_deaths": function () {
    var Times = dataPersonal.PlayerBase.Deaths.sum
    var res = [
      [
        ["Deaths", Times + " times"]
      ],
      [
        ["死亡", Times + " 次"]
      ]
    ]
    return res[lang]
  },
  "week_avg_highest_kill_streak": function () {
    var Sum = dataPersonal.PlayerBase.HighestKillStreak.sum
    var Games = dataPersonal.PlayerBase.game_total.sum
    var Times = (Sum / Games).toFixed(0)
    var res = [
      [
        ["Average Highest Kill Streak", Times + " times"]
      ],
      [
        ["平均最高连杀", Times + " 次"]
      ],
    ]
    return res[lang]
  },
  "week_max_level": function () {
    var arr = object_to_array(dataPersonal.PlayerBase.Level_count.sum)
    var Level = arr[arr.length - 1]
    var res = [
      [
        ["Max Level Reached", Level]
      ],
      [
        ["最高等级", Level + " 级"]
      ]
    ]
    return res[lang]
  },
  "week_min_level": function () {
    var arr = object_to_array(dataPersonal.PlayerBase.Level_count.sum)
    var Level = arr[0]
    var res = [
      [
        ["Min Level Reached", Level]
      ],
      [
        ["最低等级", Level + " 级"]
      ]
    ]
    return res[lang]
  },
  "week_hero_damage": function () {
    var Damage = dataPersonal.PlayerBase.HeroDamage.sum
    var res = [
      [
        ["Hero Damage", Damage]
      ],
      [
        [
          "英雄总伤害", Damage + " 伤害"
        ]
      ]
    ]
    return res[lang]
  },
  "week_siege_damage": function () {
    var Damage = dataPersonal.PlayerBase.SiegeDamage.sum
    var res = [
      [
        ["Siege Damage", Damage],
      ],
      [
        ["攻城总伤害", Damage + " 伤害"]
      ]
    ]
    return res[lang]
  },
  "week_structure_damage": function () {
    var Damage = dataPersonal.PlayerBase.StructureDamage.sum
    var res = [
      [
        ["Structure Damage", Damage],
      ],
      [
        ["建筑总伤害", Damage + " 伤害"]
      ]
    ]
    return res[lang]
  },
  "week_minion_damage": function () {
    var Damage = dataPersonal.PlayerBase.MinionDamage.sum
    var res = [
      [
        ["Minion Damage", Damage],
      ],
      [
        ["小兵总伤害", Damage + " 伤害"]
      ]
    ]
    return res[lang]
  },
  //creepdamage
  "week_creep_damage": function () {
    var Damage = dataPersonal.PlayerBase.CreepDamage.sum
    var res = [
      [
        ["Creep Damage", Damage],
      ],
      [
        ["地图机制总伤害", Damage + " 伤害"]
      ]
    ]
    return res[lang]
  },
  "week_summon_damage": function () {
    var Damage = dataPersonal.PlayerBase.SummonDamage.sum
    var res = [
      [
        ["Summon Damage", Damage],
      ],
      [
        ["召唤物总伤害", Damage + " 伤害"]
      ]
    ]
    return res[lang]
  },
  "week_TimeCCd_enemy_heroes": function () {
    var Time = dataPersonal.PlayerBase.TimeCCdEnemyHeroes.sum
    var res = [
      [
        ["Enemy Heroes CC Length", Time + " seconds"]
      ],
      [
        ["控制敌方英雄总时长", Time + " 秒"]
      ]
    ]
    return res[lang]
  },
  "week_self_healing": function () {
    var Healing = dataPersonal.PlayerBase.SelfHealing.sum
    var res = [
      [
        ["Self Healing", Healing + " heal"]
      ],
      [
        ["自我治疗", Healing + " 点治疗"]
      ]
    ]
    return res[lang]
  },
  "week_experience_contribution": function () {
    var Exp = dataPersonal.PlayerBase.ExperienceContribution.sum
    var res = [
      [
        ["Experience Contribution", Exp],
      ],
      [
        ["经验贡献", Exp + " 经验"]
      ]
    ]
    return res[lang]
  },
  "week_healing": function () {
    var Healing = dataPersonal.PlayerBase.Healing.sum
    var res = [
      [
        ["Healing", Healing]
      ],
      [
        ["治疗", Healing + " 点治疗"]
      ]
    ]
    return res[lang]
  },
  "MrecCamp": function () {
    var Times = dataPersonal.PlayerBase.MercCampCaptures.sum
    var res = [
      [
        ["MercCamp Captures", Times]
      ],
      [
        ["雇佣兵占领次数", Times + " 次"]
      ]
    ]
    return res[lang]
  },
  "TimeSilencing": function () {
    var Time = dataPersonal.PlayerBase.TimeSilencingEnemyHeroes.sum
    var res = [
      [
        ["Enemy Heroes Silenced", Time + " seconds"]
      ],
      [
        ["沉默敌人的时间", Time + " 秒"]
      ]
    ]
    return res[lang]
  },
  "TimeRooting": function () {
    var Time = dataPersonal.PlayerBase.TimeRootingEnemyHeroes.sum
    var res = [
      [
        ["Enemy Heroes Rooted", Time + " seconds"]
      ],
      [
        ["定身敌人的时间", Time + " 秒"]
      ]
    ]
    return res[lang]
  },
  "TimeStunning": function () {
    var Time = dataPersonal.PlayerBase.TimeStunningEnemyHeroes.sum
    var res = [
      [
        ["Enemy Heroes Stunned", Time + " seconds"]
      ],
      [
        ["眩晕敌人的时间", Time + " 秒"]
      ]
    ]
    return res[lang]
  },
  "ClutchHealsPerformed": function () {
    var Time = dataPersonal.PlayerBase.ClutchHealsPerformed.sum
    var res = [
      [
        ["Clutch Heals Performed", Time + " times"]
      ],
      [
        ["关键治疗次数", Time + " 次"]
      ]
    ]
    return res[lang]
  },
  "EscapesPerformed": function () {
    var Times = dataPersonal.PlayerBase.EscapesPerformed.sum
    var res = [
      [
        ["Escapes Performed", Times + " times"]
      ],
      [
        ["死里逃生次数", Times + " 次"]
      ]
    ]
    return res[lang]
  },
  "VengeancesPerformed": function () {
    var Times = dataPersonal.PlayerBase.VengeancesPerformed.sum
    var res = [
      [
        ["Vengeances Performed", Times + " times"]
      ],
      [
        ["复仇次数", Times + " 次"]
      ]
    ]
    return res[lang]
  },
  "TeamfightEscapesPerformed": function () {
    var Times = dataPersonal.PlayerBase.TeamfightEscapesPerformed.sum
    var res = [
      [
        ["Teamfight Escapes Performed", Times + " times"]
      ],
      [
        ["团战逃脱的次数", Times + " 次"]
      ]
    ]
    return res[lang]
  },
  "OutnumberedDeaths": function () {
    var Times = dataPersonal.PlayerBase.OutnumberedDeaths.sum
    var res = [
      [
        ["Outnumbered Deaths", Times + " times"]
      ],
      [
        ["被Gank的次数", Times + " 次"]
      ]
    ]
    return res[lang]
  },
  "WinsWarrior": function () {
    var Win = dataPersonal.PlayerBase.WinsWarrior.sum
    var res = [
      [
        ["Wins Warrior", Win + " times"]
      ],
      [
        ["战斗型英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinsAssassin": function () {
    var Win = dataPersonal.PlayerBase.WinsAssassin.sum
    var res = [
      [
        ["Wins Assassin", Win + " times"]
      ],
      [
        ["刺杀型英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinsSupport": function () {
    var Win = dataPersonal.PlayerBase.WinsAssassin.sum
    var res = [
      [
        ["Wins Support", Win + " times"]
      ],
      [
        ["辅助型英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinsSpecialist": function () {
    var Win = dataPersonal.PlayerBase.WinsSpecialist.sum
    var res = [
      [
        ["Wins Specialist", Win + " times"]
      ],
      [
        ["专业型英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinsStarCraft": function () {
    var Win = dataPersonal.PlayerBase.WinsStarCraft.sum
    var res = [
      [
        ["Wins StarCraft", Win + " times"]
      ],
      [
        ["星际英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinsDiablo": function () {
    var Win = dataPersonal.PlayerBase.WinsDiablo.sum
    var res = [
      [
        ["Wins Diablo", Win + " times"]
      ],
      [
        ["暗黑英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinsWarcraft": function () {
    var Win = dataPersonal.PlayerBase.WinsWarcraft.sum
    var res = [
      [
        ["Wins Warcraft", Win + " times"]
      ],
      [
        ["魔兽英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinsMale": function () {
    var Win = dataPersonal.PlayerBase.WinsMale.sum
    var res = [
      [
        ["Wins Male", Win + " times"]
      ],
      [
        ["男性英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinsFemale": function () {
    var Win = dataPersonal.PlayerBase.WinsFemale.sum
    var res = [
      [
        ["Wins Female", Win + " times"]
      ],
      [
        ["女性英雄胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "GamesOfWarrior": function () {
    var Games = dataPersonal.PlayerBase.PlaysWarrior.sum
    var res = [
      [
        ["Tanks Played", Games + " times"]
      ],
      [
        ["战斗型英雄局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "GamesOfAssassin": function () {
    var Games = dataPersonal.PlayerBase.PlaysAssassin.sum
    var res = [
      [
        ["Assassins Played", Games + " times"]
      ],
      [
        ["刺杀型英雄局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "GamesOfSupport": function () {
    var Games = dataPersonal.PlayerBase.PlaysSupport.sum
    var res = [
      [
        ["Support Played", Games + " times"]
      ],
      [
        ["治疗型英雄局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "GamesOfSpecialist": function () {
    var Games = dataPersonal.PlayerBase.PlaysSpecialist.sum
    var res = [
      [
        ["Specialist Played", Games + " times"]
      ],
      [
        ["专业型英雄局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "GamesOfMale": function () {
    var Games = dataPersonal.PlayerBase.PlaysMale.sum
    var res = [
      [
        ["Male Played", Games + " times"]
      ],
      [
        ["男性英雄局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "GamesOfFemale": function () {
    var Games = dataPersonal.PlayerBase.PlaysFemale.sum
    var res = [
      [
        ["Female Played", Games + " times"]
      ],
      [
        ["女性英雄局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "WinRateOfWarrior": function () {
    var Games = dataPersonal.PlayerBase.PlaysWarrior.sum
    if (Games <= 0)
      return false
    var Win = dataPersonal.PlayerBase.WinsWarrior.sum
    var WinRate = (Win / Games * 100).toFixed(2)
    var res = [
      [
        ["Tanks WinRate", Games > 0 ? WinRate + "%" : '']
      ],
      [
        ["战斗型英雄胜率", Games > 0 ? WinRate + "%" : '']
      ]
    ]
    return res[lang]
  },
  "WinRateOfAssassin": function () {
    var Games = dataPersonal.PlayerBase.PlaysAssassin.sum
    var Win = dataPersonal.PlayerBase.WinsAssassin.sum
    var WinRate = (Win / Games * 100).toFixed(2)
    var res = [
      [
        ["Assassins WinRate", Games > 0 ? WinRate + "%" : '']
      ],
      [
        ["刺杀型英雄胜率", Games > 0 ? WinRate + "%" : '']
      ]
    ]
    return res[lang]
  },
  "WinRateOfSupport": function () {
    var Games = dataPersonal.PlayerBase.PlaysSupport.sum
    if (Games <= 0)
      return false
    var Win = dataPersonal.PlayerBase.WinsSupport.sum
    var WinRate = (Win / Games * 100).toFixed(2)
    var res = [
      [
        ["Support WinRate", Games > 0 ? WinRate + "%" : '']
      ],
      [
        ["治疗型英雄胜率", Games > 0 ? WinRate + "%" : '']
      ]
    ]
    return res[lang]
  },
  "WinRateOfSpecialist": function () {
    var Games = dataPersonal.PlayerBase.PlaysSpecialist.sum
    if (Games <= 0)
      return false
    var Win = dataPersonal.PlayerBase.WinsSpecialist.sum
    var WinRate = (Win / Games * 100).toFixed(2)
    var res = [
      [
        ["Specialist WinRate", Games > 0 ? WinRate + "%" : '']
      ],
      [
        ["专业型英雄胜率", Games > 0 ? WinRate + "%" : '']
      ]
    ]
    return res[lang]
  },
  "TimesOfDtagon": function () {
    var Times = dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum
    var res = [
      [
        ["Take Dragons In This Week", Times + " times"]
      ],
      [
        ["开启龙骑士次数", Times + " 次"]
      ]
    ]
    return res[lang]
  },
  "TimesOfDtagonShrines": function () {
    var Times = dataPersonal.PlayerBase.DragonShrinesCaptured.sum
    var res = [
      [
        ["DragonSrines Taken", Times + " times"]
      ],
      [
        ["占领龙骑士祭坛次数", Times + " 次"]
      ]
    ]
    return res[lang]
  },
  "NumbersOfGardensSeeds": function () {
    var Count = dataPersonal.PlayerBase.GardensSeedsCollected.sum
    var res = [
      [
        ["GardensSeeds Collected", Count]
      ],
      [
        ["收集花园种子总数", Count + " 个"]
      ]
    ]
    return res[lang]
  },
  "DamageOfGardensPlant": function () {
    var Damage = dataPersonal.PlayerBase.GardensPlantDamage.sum
    var res = [
      [
        ["GardensPlant Damage", Damage]
      ],
      [
        ["恐魔总伤害量",
          Damage
        ]
      ]
    ]
    return res[lang]
  },
  "DamageDoneOfAltar": function () {
    var Damage = dataPersonal.PlayerBase.AltarDamageDone.sum
    var res = [
      [
        ["Altar Damage Done", Damage]
      ],
      [
        ["占领天空殿神殿造成的总伤害量",
          Damage
        ]
      ]
    ]
    return res[lang]
  },
  "DamageToImmortal": function () {
    var Damage = dataPersonal.PlayerBase.DamageDoneToImmortal.sum
    var res = [
      [
        ["Damage Done To Immortal", Damage]
      ],
      [
        ["对不朽者总伤害量",
          Damage
        ]
      ]
    ]
    return res[lang]
  },
  "GemsTurned": function () {
    var Count = dataPersonal.PlayerBase.GemsTurnedIn.sum
    var res = [
      [
        ["Gems Turned In", Count]
      ],
      [
        ["上交宝石总量",
          Count
        ]
      ]
    ]
    return res[lang]
  },
  "RavenCollected": function () {
    var Count = dataPersonal.PlayerBase.RavenTributesCollected.sum
    var res = [
      [
        ["Raven Tributes Collected", Count]
      ],
      [
        ["乌鸦诅咒收集总量",
          Count
        ]
      ]
    ]
    return res[lang]
  },
  "MinesCollected": function () {
    var Count = dataPersonal.PlayerBase.MinesSkullsCollected.sum
    var res = [
      [
        ["Mines Skulls Collected", Count]
      ],
      [
        ["鬼灵矿收集总量",
          Count
        ]
      ]
    ]
    return res[lang]
  },
  "DoubloonsCollected": function () {
    var Count = dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
    var res = [
      [
        ["Black Heart Doubloons Collected", Count]
      ],
      [
        ["达布隆币收集总量",
          Count
        ]
      ]
    ]
    return res[lang]
  },
  "DoubloonsTurnedIn": function () {
    var Count = dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
    var res = [
      [
        ["Black Heart Doubloons Turned In", Count]
      ],
      [
        ["达布隆币上交总量",
          Count
        ]
      ]
    ]
    return res[lang]
  },
  "TimesInTemple": function () {
    var Time = dataPersonal.PlayerBase.TimeInTemple.sum
    var res = [
      [
        ["Time In Temple", Time + " seconds"]
      ],
      [
        ["天空殿占领神殿总时间", Time + " s"]
      ]
    ]
    return res[lang]
  },
  "NukeDamage": function () {
    var Damage = dataPersonal.PlayerBase.NukeDamageDone.sum
    var res = [
      [
        ["Nuke Damage Done", Damage]
      ],
      [
        ["核弹头总伤害",
          Damage
        ]
      ]
    ]
    return res[lang]
  },
  "2_Plays_total": function () {
    var Games = dataPersonal.PlayerBase.party_total_2.sum;
    var res = [
      [
        ["The Games of 2 Premades", Games]
      ],
      [
        ["两人开黑场数",
          Games
        ]
      ]
    ]
    return res[lang]
  },
  "3_Plays_total": function () {
    var Games = dataPersonal.PlayerBase.party_total_3.sum;
    var res = [
      [
        ["The Games of 3 Premades", Games]
      ],
      [
        ["三人开黑场数",
          Games
        ]
      ]
    ]
    return res[lang]
  },
  "4_Plays_total": function () {
    var Games = dataPersonal.PlayerBase.party_total_4.sum;
    var res = [
      [
        ["The Games of 4 Premades", Games]
      ],
      [
        ["四人开黑场数",
          Games
        ]
      ]
    ]
    return res[lang]
  },
  "5_Plays_total": function () {
    var Games = dataPersonal.PlayerBase.party_total_5.sum;
    var res = [
      [
        ["The Games of 5 Premades", Games]
      ],
      [
        ["五人开黑场数",
          Games
        ]
      ]
    ]
    return res[lang]
  },
  "2_WinRate": function () {
    var Games = dataPersonal.PlayerBase.party_total_2.sum;
    var Win = dataPersonal.PlayerBase.party_win_2.sum
    var WinRate = Games > 0 ? (Win / Games * 100).toFixed(2) : ''
    var res = [
      [
        ["The Win Rate of 2 Premades", WinRate]
      ],
      [
        ["两人开黑胜率",
          WinRate
        ]
      ]
    ]
    return res[lang]
  },
  "3_WinRate": function () {
    var Games = dataPersonal.PlayerBase.party_total_3.sum;
    var Win = dataPersonal.PlayerBase.party_win_3.sum
    var WinRate = Games > 0 ? (Win / Games * 100).toFixed(2) : ''
    var res = [
      [
        ["The Win Rate of 3 Premades", WinRate]
      ],
      [
        ["三人开黑胜率",
          WinRate
        ]
      ]
    ]
    return res[lang]
  },
  "4_WinRate": function () {
    var Games = dataPersonal.PlayerBase.party_total_4.sum;
    var Win = dataPersonal.PlayerBase.party_win_4.sum
    var WinRate = Games > 0 ? (Win / Games * 100).toFixed(2) : ''
    var res = [
      [
        ["The Win Rate of 4 Premades", WinRate]
      ],
      [
        ["四人开黑胜率",
          WinRate
        ]
      ]
    ]
    return res[lang]
  },
  "5_WinRate": function () {
    var Games = dataPersonal.PlayerBase.party_total_5.sum;
    var Win = dataPersonal.PlayerBase.party_win_5.sum
    var WinRate = Games > 0 ? (Win / Games * 100).toFixed(2) : ''
    var res = [
      [
        ["The Win Rate of 5 Premades", WinRate]
      ],
      [
        ["五人开黑胜率",
          WinRate
        ]
      ]
    ]
    return res[lang]
  },
  "MapsLength": function () {
    var Time = dataPersonal.PlayerBase.maps_length.sum
    var res = [
      [
        ["Total Time Spent On Each Map", Time]
      ],
      [
        ["地图游戏时间",
          Time
        ]
      ]
    ]
    return res[lang]

  },
  "MapsTimes": function () {
    var Times = dataPersonal.PlayerBase.maps_total.sum
    var res = [
      [
        ["Games Played On Each Map", Times]
      ],
      [
        ["地图游戏次数",
          Times
        ]
      ]
    ]
    return res[lang]

  },
  "MapsWin": function () {
    var Win = dataPersonal.PlayerBase.maps_win.sum
    var res = [
      [
        ["Wins On Each Map", Win]
      ],
      [
        ["地图胜场数",
          Win
        ]
      ]
    ]
    return res[lang]

  },
  "LevelAchieve": function () {
    var Level = dataPersonal.PlayerBase.Level_count.sum
    var res = [
      [
        ["Team Level At End Of The Game", Level]
      ],
      [
        ["游戏结束时的等级", Level + "级"]
      ]
    ]
    return res[lang]

  },
  "LastGameTime": function () {
    var Time = timestamptotime(dataPersonal.PlayerBase.last_game_time.max)
    var res = [
      [
        ["Duration Of The Last Game", Time]
      ],
      [
        ["上一次游戏时间",
          Time
        ]
      ]
    ]
    return res[lang]

  },
  "WeekGlobalTimes": function () {
    var Games = Math.round(dataGlobal.PlayerBase.game_total.sum / 10)
    var res = [
      [
        ["Global Times", Games + " times"]
      ],
      [
        ["全球场次", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "WeekGlobalLength": function () {
    var Time = Math.round(dataGlobal.PlayerBase.game_length.sum / 10 / 60)
    var res = [
      [
        ["Global Length", Time + " minutes"]
      ],
      [
        ["全球时长", Time + " 分钟"]
      ]
    ]
    return res[lang]
  },
  "WeekGlobalMostWinInHeroLeague": function () {
    var HeroID = 0
    var WinRate = 0
    for (var hero in dataGlobal.PlayerHeroes) {
      if (dataGlobal.PlayerHeroes[hero].game_total_HeroLeague.sum > 0) {
        var Rate = (dataGlobal.PlayerHeroes[hero].game_win_HeroLeague.sum / dataGlobal.PlayerHeroes[hero].game_total_HeroLeague.sum * 100).toFixed(2)
        if (Rate > WinRate && dataGlobal.PlayerHeroes[hero].game_total_HeroLeague.sum > 5) {
          WinRate = Rate
          HeroID = parseInt(hero)
        }
      }
    }
    var HeroInf = getHeroInf(HeroID)
    var res = [
      [
        ["Global Most Win Heroes In Hero League",
          (WinRate <= 0 || HeroInf === undefined) ? '' : "Hero " + HeroInf.name_en + " Hero League WinRate is  " + WinRate + "%"
        ]
      ],
      [
        ["英雄联赛全球胜率最高的英雄", (WinRate <= 0 || HeroInf === undefined) ? '' : "英雄 " + HeroInf.name_cn + " 英雄联赛胜率是 " + WinRate + "%"]
      ]
    ]
    return res[lang]
  },
  "WeekGlobalMostWinInTeamLeague": function () {
    var HeroID = 0
    var WinRate = 0
    for (var hero in dataGlobal.PlayerHeroes) {
      if (dataGlobal.PlayerHeroes[hero].game_total_TeamLeague.sum > 0) {
        var Rate = (dataGlobal.PlayerHeroes[hero].game_win_TeamLeague.sum / dataGlobal.PlayerHeroes[hero].game_total_TeamLeague.sum * 100).toFixed(2)
        if (Rate > WinRate && dataGlobal.PlayerHeroes[hero].game_total_TeamLeague.sum > 5) {
          WinRate = Rate
          HeroID = parseInt(hero)
        }
      }
    }
    var HeroInf = getHeroInf(HeroID)
    var res = [
      [
        ["Global Most Win Heroes In Team League",
          (WinRate <= 0 || HeroInf === undefined) ? '' : "Hero " + HeroInf.name_en + " Team League WinRate is  " + WinRate + "%"
        ]
      ],
      [
        ["团队联赛全球胜率最高的英雄", (WinRate <= 0 || HeroInf === undefined) ? '' : "英雄 " + HeroInf.name_cn + " 团队联赛胜率是 " + WinRate + "%"]
      ]
    ]
    return res[lang]
  },
  "WeekGlobalMostWinInQuickMatch": function () {
    var HeroID = 0
    var WinRate = 0
    for (var hero in dataGlobal.PlayerHeroes) {
      if (dataGlobal.PlayerHeroes[hero].game_total_QuickMatch.sum > 0) {
        var Rate = (dataGlobal.PlayerHeroes[hero].game_win_QuickMatch.sum / dataGlobal.PlayerHeroes[hero].game_total_QuickMatch.sum * 100).toFixed(2)
        if (Rate > WinRate && dataGlobal.PlayerHeroes[hero].game_total_QuickMatch.sum > 5) {
          WinRate = Rate
          HeroID = parseInt(hero)
        }
      }
    }
    var HeroInf = getHeroInf(HeroID)
    var res = [
      [
        ["Global Most Win Heroes In Quick Match", (WinRate <= 0 || HeroInf === undefined) ? '' : "Hero " + HeroInf.name_en + " Quick Match WinRate is  " + WinRate + "%"]
      ],
      [
        ["快速比赛全球胜率最高的英雄", (WinRate <= 0 || HeroInf === undefined) ? '' : "英雄 " + HeroInf.name_cn + " 快速比赛胜率是 " + WinRate + "%"]
      ]
    ]
    return res[lang]
  },
  "WeekGlobalMostWinInUnrankedDraft": function () {
    var HeroID = 0
    var WinRate = 0
    for (var hero in dataGlobal.PlayerHeroes) {
      if (dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum > 0) {
        var Rate = (dataGlobal.PlayerHeroes[hero].game_win_UnrankedDraft.sum / dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum * 100).toFixed(2)
        if (Rate > WinRate && dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum > 5) {
          WinRate = Rate
          HeroID = parseInt(hero)
        }
      }
    }
    var HeroInf = getHeroInf(HeroID)
    var res = [
      [
        ["Global Most Win Heroes In Unranked Draft", (WinRate <= 0 || HeroInf === undefined) ? '' : "Hero " + HeroInf.name_en + " Unranked Draft WinRate is  " + WinRate + "%"]
      ],
      [
        ["非排名模式全球胜率最高的英雄", (WinRate <= 0 || HeroInf === undefined) ? '' : "英雄 " + HeroInf.name_cn + " 非排名模式胜率是 " + WinRate + "%"]
      ]
    ]
    return res[lang]
  },
  "GlobalWinsWarrior": function () {
    var Win = Math.round(dataGlobal.PlayerBase.WinsWarrior.sum / 10)
    var res = [
      [
        ["Global Wins on Warriors", Win + " times"]
      ],
      [
        ["战斗型英雄全球胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "GlobalWinsAssassin": function () {
    var Win = Math.round(dataGlobal.PlayerBase.WinsAssassin.sum / 10)
    var res = [
      [
        ["Global Wins on Assassins", Win + " times"]
      ],
      [
        ["刺杀型英雄全球胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "GlobalWinsSupport": function () {
    var Win = Math.round(dataGlobal.PlayerBase.WinsAssassin.sum / 10)
    var res = [
      [
        ["Global Wins on Supports", Win + " times"]
      ],
      [
        ["辅助型英雄全球胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "GlobalWinsSpecialist": function () {
    var Win = Math.round(dataGlobal.PlayerBase.WinsSpecialist.sum / 10)
    var res = [
      [
        ["Global Wins Specialists", Win + " times"]
      ],
      [
        ["专业型英雄全球胜场", Win + " 局"]
      ]
    ]
    return res[lang]
  },
  "GlobalGamesOfWarrior": function () {
    var Games = Math.round(dataGlobal.PlayerBase.PlaysWarrior.sum / 10)
    var res = [
      [
        ["Global Tanks Played", Games + " times"]
      ],
      [
        ["战斗型英雄全球局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "GlobalGamesOfAssassin": function () {
    var Games = Math.round(dataGlobal.PlayerBase.PlaysAssassin.sum / 10)
    var res = [
      [
        ["Global Assassins Played", Games + " times"]
      ],
      [
        ["刺杀型英雄全球局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "Global GamesOfSupport": function () {
    var Games = Math.round(dataGlobal.PlayerBase.PlaysSupport.sum / 10)
    var res = [
      [
        ["Global Supports Played", Games + " times"]
      ],
      [
        ["治疗型英雄全球局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "GlobalGamesOfSpecialist": function () {
    var Games = Math.round(dataGlobal.PlayerBase.PlaysSpecialist.sum / 10)
    var res = [
      [
        ["Global Specialisted Played", Games + " times"]
      ],
      [
        ["专业型英雄全球局数", Games + " 局"]
      ]
    ]
    return res[lang]
  },
  "GlobalWinRateOfWarrior": function () {
    var Games = dataGlobal.PlayerBase.PlaysWarrior.sum
    var Win = dataGlobal.PlayerBase.WinsWarrior.sum
    var res = [
      [
        ["Global Tanks WinRate", (Games <= 0) ? '' : (Win / Games * 100).toFixed(2) + "%"]
      ],
      [
        ["战斗型英雄全球胜率", (Games <= 0) ? '' : (Win / Games * 100).toFixed(2) + "%"]
      ]
    ]
    return res[lang]
  },
  "GlobalWinRateOfAssassin": function () {
    var Games = dataGlobal.PlayerBase.PlaysAssassin.sum
    var Win = dataGlobal.PlayerBase.WinsAssassin.sum
    var res = [
      [
        ["Global Assassins WinRate", (Games <= 0) ? '' : (Win / Games * 100).toFixed(2) + "%"]
      ],
      [
        ["刺杀型英雄全球胜率", (Games <= 0) ? '' : (Win / Games * 100).toFixed(2) + "%"]
      ]
    ]
    return res[lang]
  },
  "GlobalWinRateOfSupport": function () {
    var Games = dataGlobal.PlayerBase.PlaysSupport.sum
    var Win = dataGlobal.PlayerBase.WinsSupport.sum
    var res = [
      [
        ["Global Support WinRate", (Games <= 0) ? '' : (Win / Games * 100).toFixed(2) + "%"]
      ],
      [
        ["治疗型英雄全球胜率", (Games <= 0) ? '' : (Win / Games * 100).toFixed(2) + "%"]
      ]
    ]
    return res[lang]
  },
  "GlobalWinRateOfSpecialist": function () {
    var Games = dataGlobal.PlayerBase.PlaysSpecialist.sum
    var Win = dataGlobal.PlayerBase.WinsSpecialist.sum
    var res = [
      [
        ["Global Specialist WinRate", (Games <= 0) ? '' : (Win / Games * 100).toFixed(2) + "%"]
      ],
      [
        ["专业型英雄全球胜率", (Games <= 0) ? '' : (Win / Games * 100).toFixed(2) + "%"]
      ]
    ]
    return res[lang]
  },
}

var events = {
  "ZergKiller": [
    ["Zerg Killer", "虫群杀手"], //禁区
    function () {
      var AvgDamage = Math.round(dataPersonal.PlayerBase.DamageDoneToZerg.sum / dataPersonal.PlayerBase.maps_total.sum[12])
      var limit = AvgDamage > 8000
      return limit ? [
        "You made " + AvgDamage + " zerg damage on average in Braxis Holdout",
        "平均每场布莱克西斯禁区中，你对虫群造成 " + AvgDamage + " 点伤害"
      ] : false
    }
  ],
  "HoldoutRate": [
    ["Braxis Holdout", "布莱克西斯禁区"], //禁区
    function () {
      if (dataPersonal.PlayerBase.maps_total.sum[12] === undefined || dataPersonal.PlayerBase.maps_total.sum[12] < 5 || dataPersonal.PlayerBase.maps_win.sum[12] === undefined)
        return false
      var AvgDamage = Math.round(dataPersonal.PlayerBase.DamageDoneToZerg.sum / dataPersonal.PlayerBase.maps_total.sum[12])
      var WinRate = (dataPersonal.PlayerBase.maps_win.sum[12] / dataPersonal.PlayerBase.maps_total.sum[12] * 100).toFixed(2)
      var GlobalWinRate = (dataGlobal.PlayerBase.maps_win.sum[12] / dataGlobal.PlayerBase.maps_total.sum[12] * 100).toFixed(2)
      var limit = AvgDamage <= 4000 || parseInt(WinRate) < parseInt(GlobalWinRate)
      return limit ? [
        "You made " + AvgDamage + " zerg damage on average in Braxis Holdout,and you winning rate is " + WinRate + "%",
        "你这周布莱克西斯禁区地图胜率是 " + WinRate + "%，你对虫群造成 " + AvgDamage + " 点伤害"
      ] : false
    }
  ],

  "WinRate": [
    ["Amazing Win Rate", "令人惊讶的胜率"],
    function () {
      var WinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
      var GlobalWinRate = (dataGlobal.PlayerBase.game_win.sum / dataGlobal.PlayerBase.game_total.sum * 100).toFixed(0)
      var limit = WinRate > 1.3 * GlobalWinRate
      return limit ? [
        "Your win rate " + WinRate + "% is far higher than the global",
        "你的胜率 " + WinRate + "% 远远高于全球水平"
      ] : false
    }
  ],
  "TheLightOfSupport": [
    ["The Light Of Support", "辅助之光"],
    function () {
      var Support = dataPersonal.PlayerBase.PlaysSupport.sum
      var SupportWin = dataPersonal.PlayerBase.WinsSupport.sum
      var gameTotal = dataPersonal.PlayerBase.game_total.sum
      if (gameTotal <= 0 || Support <= 0)
        return false;

      var SupportRate = (Support / gameTotal * 100).toFixed(2)
      var SupportWinRate = (SupportWin / Support * 100).toFixed(2)
      var limit = Support >= 4 && SupportRate > 50
      return limit ? [
        "Among your " + gameTotal + " games you have played last week, you chose " + gameTotal + " times as Support heroes, that was " + SupportRate + " of your total games, with the " + SupportWinRate + " WinRate",
        "上周你在 " + gameTotal + " 局里，玩了 " + Support + " 局辅助，占了总局数的 " + SupportRate + "%" + "，您辅助的胜率是 " + SupportWinRate
      ] : false
    }
  ],
  "DragonRider": [
    ["Dragon Rider", "龙骑士"], //巨龙镇
    function () {
      if (dataPersonal.PlayerBase.maps_total.sum[7] === undefined)
        return false
      var myDragon = (dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataPersonal.PlayerBase.maps_total.sum[7]).toFixed(2)
      var GlobalDragon = (dataGlobal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataGlobal.PlayerBase.maps_total.sum[7]).toFixed(2)
      var limit = myDragon > 2 * GlobalDragon
      var times = Math.round(myDragon / GlobalDragon)
      return limit ? [
        "You are a real DragonRider with the " + times + " times to take dragon ,and the global average is " + GlobalDragon + "times",
        "你开龙的次数是全球平均水平的 " + times + " 倍呢！真是个名副其实的龙骑士！"
      ] : false
    }
  ],
  "DragonShire": [
    ["Dragon Shire", "巨龙镇"], //巨龙镇
    function () {
      if (dataPersonal.PlayerBase.maps_total.sum[7] === undefined || dataPersonal.PlayerBase.maps_win.sum[7] === undefined || dataPersonal.PlayerBase.maps_total.sum[7] < 5 )
        return false
      var myDragon = (dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataPersonal.PlayerBase.maps_total.sum[7]).toFixed(1)
      var GlobalDragon = (dataGlobal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataGlobal.PlayerBase.maps_total.sum[7]).toFixed(1)
      var WinRate = (dataPersonal.PlayerBase.maps_win.sum[7] / dataPersonal.PlayerBase.maps_total.sum[7] * 100).toFixed(2)
      var GlobalWinRate = (dataGlobal.PlayerBase.maps_win.sum[7] / dataGlobal.PlayerBase.maps_total.sum[7] * 100).toFixed(2)
      var ShrinesCaptured = (dataPersonal.PlayerBase.DragonShrinesCaptured.sum / dataPersonal.PlayerBase.maps_total.sum[7]).toFixed(1)
      var GlobalShrinesCaptured = (dataGlobal.PlayerBase.DragonShrinesCaptured.sum / dataGlobal.PlayerBase.maps_total.sum[7]).toFixed(1)
      return [
        "This week, your winning rate of Dragon Shire is " + WinRate + "%, you averaged take " + myDragon + " times dragon, the global average is " + GlobalDragon + " times, You average capture the Shirines " +
        ShrinesCaptured + " times, the global average is " + GlobalShrinesCaptured + " times",
        "你这周巨龙镇地图胜率是 " + WinRate + "%，你平均每场开了 " + myDragon + " 次龙，全球平均开龙 " + GlobalDragon + " 次龙，你平均每场占领了祭坛 " + ShrinesCaptured + " 次，全球平均占领祭坛 " + GlobalShrinesCaptured + " 次",
      ]
    }
  ],
  "Premades": [
    ["The King Of Premades", "开黑小能手"],
    function () {
      if (dataPersonal.PlayerBase.party_total_2.sum <= 0 || dataPersonal.PlayerBase.party_total_3.sum <= 0 || dataPersonal.PlayerBase.party_total_4.sum <= 0 || dataPersonal.PlayerBase.party_total_5.sum <= 0)
        return false
      var rate_2 = (dataPersonal.PlayerBase.party_win_2.sum / dataPersonal.PlayerBase.party_total_2.sum * 100).toFixed(2)
      var rate_3 = (dataPersonal.PlayerBase.party_win_3.sum / dataPersonal.PlayerBase.party_total_3.sum * 100).toFixed(2)
      var rate_4 = (dataPersonal.PlayerBase.party_win_4.sum / dataPersonal.PlayerBase.party_total_4.sum * 100).toFixed(2)
      var rate_5 = (dataPersonal.PlayerBase.party_win_5.sum / dataPersonal.PlayerBase.party_total_5.sum * 100).toFixed(2)
      var limit = rate_2 >= 50 && rate_3 >= 50 && rate_4 >= 50 && rate_5 >= 50
      return limit ? [
        "Your Win Rates of Premades were all beyond 50%, nice team work!",
        "你和好友开黑的胜率都超过了50%，是个名副其实的开黑小能手呢"
      ] : false
    }
  ],
  "Miser": [
    ["Miser", "吝啬鬼"], //黑心湾
    function () {
      var Collected = dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
      var TurnedIn = dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
      var limit = Collected >= 3 && TurnedIn < 0.6 * Collected
      return limit ? [
        "On Black Heart Bay, you collected " + Collected + " Doubloons Coins " + ", but you only successfully turned in " + TurnedIn + ". You should look for more opportunities to turn in",
        "黑心湾地图中，你收集了 " + Collected + " 个达布隆币" + ",但是你只成功上交了 " + TurnedIn + " 个达布隆币，你应该多寻找机会上交"
      ] : false
    }
  ],
  "Hunter": [
    ["Hunter", "猎人"], //黑心湾
    function () {
       var Collected = dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
       var TurnedIn = dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
       var limit =  TurnedIn > 2 * Collected && TurnedIn > 20
       return limit ? [
          "On Black Heart Bay, you collected " + Collected + " Doubloons Coins " + ", but you  successfully turned in " + TurnedIn + " . Superb game strategy! Hunt the rich!",
           "黑心湾地图中，你收集了 " + Collected + " 个达布隆币" + ",但是上交了高达 " + TurnedIn + " 个达布隆币，高超的游戏策略！狩猎敌方富人！"
       ] : false
    }
   ],
  "UselessRavenTributes": [
    ["Useless Raven Tributes", "无用的乌鸦诅咒"], //诅咒谷
    function () {
      var Collected = dataPersonal.PlayerBase.RavenTributesCollected.sum
      var Damage = dataPersonal.PlayerBase.CurseDamageDone.sum
      var Collected_gol = dataGlobal.PlayerBase.RavenTributesCollected.sum
      var Damage_gol = dataPersonal.PlayerBase.CurseDamageDone.sum
      var limit = Collected > 0.8 * Collected_gol && Damage < 0.5 * Damage_gol
      return limit ? [
        "On Curse Valley, your curse damage was " + Damage + ", and the global average was " + Damage_gol + ". Use the curse time to get the maximum curse damage, such as pushing the line, pushing the tower, etc..",
        "诅咒谷地图中，你的诅咒伤害是 " + Damage + " ,而全球平均水平是 " + Damage_gol + " 要善用诅咒时间来获取最大的诅咒伤害，比如跟推吃线、推塔等等"
      ] : false
    }
  ],
  "PartyWinRate": [
    ["Good Bro", "好兄弟"],
    function () {
      var myPartyWinRate = (dataPersonal.PlayerBase.party_win.sum / dataPersonal.PlayerBase.party_total.sum * 100).toFixed(2)
      var globalPartyWinRate = (dataGlobal.PlayerBase.party_win.sum / dataGlobal.PlayerBase.party_total.sum * 100).toFixed(2)
      var limit = myPartyWinRate > 1.2 * globalPartyWinRate
      return limit ? [
        "Your party win rate ( " + myPartyWinRate + "%) was far higher than the global average (" + globalPartyWinRate + "%) ",
        "你与好友开黑的胜率 (" + myPartyWinRate + "%) 远远高于全球平均水平 (" + globalPartyWinRate + "%) "
      ] : false
    }
  ],
  "HeroDamage": [
    ["Massive Hero Damage", "大量英雄伤害"],
    function () {
      var myHeroDamage = Math.round(dataPersonal.PlayerBase.HeroDamage.sum / dataPersonal.PlayerBase.game_total.sum)
      var globalHeroDamage = Math.round(dataGlobal.PlayerBase.HeroDamage.sum / dataGlobal.PlayerBase.game_total.sum)
      var limit = myHeroDamage > 1.5 * globalHeroDamage
      return limit ? [
        "Your average HeroDamage (" + myHeroDamage + ") is far higher than the global average (" + globalHeroDamage + ") ",
        "你的场均英雄伤害 (" + myHeroDamage + ") 远远高于全球平均水平( " + globalHeroDamage + ") "
      ] : false
    }
  ],
  "TownKills": [
    ["Town Kills", "防御塔击杀"],
    function () {
      var data = dataPersonal.PlayerBase.TownKills.sum
      var limit = data > 5
      return limit ? [
        "You are killed by Town for " + data + " times",
        "你被防御塔击杀了 " + data + " 次",
      ] : false
    }
  ],
  "ControlMan": [
    ["Control Man", "掌控者"],
    function () {
      var data = Math.round(dataPersonal.PlayerBase.TimeCCdEnemyHeroes.sum)
      var games = dataPersonal.PlayerBase.game_total.sum
      var limit = (data / games) > 50
      return limit ? [
        "You have controlled enemy hero for " + data + " seconds",
        "这周你控制了敌方英雄 " + data + " 秒",
      ] : false
    }
  ],
  "MrecCampMan": [
    ["MercCamp King", "雇佣王"],
    function () {
      var WinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
      var times = dataPersonal.PlayerBase.MercCampCaptures.sum
      var games = dataPersonal.PlayerBase.game_total.sum
      var result = times / games
      var limit = result > 4 && WinRate > 55
      return limit ? [
        "You averaged " + times + " MrecCampCaputers per game. Good occupiedCamp habits have made your winning rate is " + WinRate + "%.",
        "你平均每场游戏占领了 " + times + " 次雇佣兵，良好的开野习惯使你的胜率达到了 " + WinRate + "%",
      ] : false
    }
  ],
  "WaterInDesert": [
    ["Water In Desert", "雪中送炭"],
    function () {
      var times_per = (dataPersonal.PlayerBase.ClutchHealsPerformed.sum / dataPersonal.PlayerBase.PlaysSupport.sum).toFixed(2)
      var times_glo = (dataGlobal.PlayerBase.ClutchHealsPerformed.sum / dataGlobal.PlayerBase.PlaysSupport.sum).toFixed(2)
      var limit = times_per > 1.2 * times_glo
      return limit ? [
        "You have " + times_per + " Clutch Heals per game in the assist games, and you are the most reliable partner in the team.",
        "你在辅助型局中，平均每场有 " + times_per + " 次关键治疗，是团队中最可靠的伙伴",
      ] : false
    }
  ],
  "ServentOfSpiderQueen": [
    ["Servent Of Spider Queen", "蛛后的仆人"],
    function () {
      var TurnedIn = (dataPersonal.PlayerBase.GemsTurnedIn.sum / dataPersonal.PlayerBase.maps_total.sum[5]).toFixed(0)
      var GlobalTurnedIn = (dataGlobal.PlayerBase.GemsTurnedIn.sum / dataGlobal.PlayerBase.maps_total.sum[5]).toFixed(0)
      var limit = TurnedIn > 1.5 * GlobalTurnedIn
      return limit ? [
        "On Tomb Of The Spider Queen, you turned in " + TurnedIn + " per game, you are the very loyal servant of The sipder queen.",
        "蛛后墓地图中，你平均每场上交了 " + TurnedIn + " 宝石，蛛后的忠心的仆从就是你啦",
      ] : false
    }
  ],
  "HeroOfLife": [
    ["Hero Of Life", "本命英雄"],
    function () {
      var HeroID = dataPersonal.PlayerHeroes._sumMax.game_total[0]
      var Games = dataPersonal.PlayerHeroes._sumMax.game_total[1]
      var WinRate = (dataPersonal.PlayerHeroes[HeroID].game_win.sum / dataPersonal.PlayerHeroes[HeroID].game_total.sum * 100).toFixed(2)
      var HeroInf = getHeroInf(HeroID)
      var limit = WinRate > 55 && Games >= 10
      return limit ? [
        "You have played Hero " + HeroInf.name_en + " for " + Games + " times, with " + WinRate + "% winning rate.",
        "你使用了英雄 " + HeroInf.name_cn + " 上场了 " + Games + " 次，胜率达到了" + WinRate + "%",
      ] : false
    }
  ],
  "MyLifeforaier": [
    ["My Life For Aier", "为了艾尔"],
    function () {
      if (dataPersonal.PlayerHeroes[1] === undefined || dataPersonal.PlayerHeroes[6] === undefined || dataPersonal.PlayerHeroes[43] === undefined ||
        dataPersonal.PlayerHeroes[56] === undefined || dataPersonal.PlayerHeroes[64] === undefined || dataPersonal.PlayerHeroes[78] === undefined)
        return false
      var Zeratul = dataPersonal.PlayerHeroes[1].game_total.sum > 0
      var Tassadar = dataPersonal.PlayerHeroes[6].game_total.sum > 0
      var Artanis = dataPersonal.PlayerHeroes[43].game_total.sum > 0
      var Alarak = dataPersonal.PlayerHeroes[56].game_total.sum > 0
      var Probius = dataPersonal.PlayerHeroes[64].game_total.sum > 0
      var Fenix = dataPersonal.PlayerHeroes[78].game_total.sum > 0
      var limit = Zeratul + Tassadar + Artanis + Alarak + Probius + Fenix > 15
      return limit ? [
        "En taro Tassadar! Zeratul, Tassadar, Artanis, Alarak, Probius, Fenix and other Protoss heroes have been called many times!",
        "En taro Tassadar！泽拉图、塔萨达尔、阿塔尼斯、阿拉纳克、普罗比斯、菲尼克斯等星灵英雄多次被你征召！",
      ] : false
    }
  ],
  "IamTheSwarm": [
    ["I am The Swarm", "我既是虫群"],
    function () {
      if (dataPersonal.PlayerHeroes[15] === undefined || dataPersonal.PlayerHeroes[22] === undefined || dataPersonal.PlayerHeroes[27] === undefined ||
        dataPersonal.PlayerHeroes[50] === undefined || dataPersonal.PlayerHeroes[69] === undefined)
        return false
      var Kerrigan = dataPersonal.PlayerHeroes[15].game_total.sum > 0
      var Abathur = dataPersonal.PlayerHeroes[22].game_total.sum > 0
      var Zagara = dataPersonal.PlayerHeroes[27].game_total.sum > 0
      var Dehaka = dataPersonal.PlayerHeroes[50].game_total.sum > 0
      var Stukov = dataPersonal.PlayerHeroes[69].game_total.sum > 0
      var limit = Kerrigan + Abathur + Zagara + Dehaka + Stukov > 12
      return limit ? [
        "For the Zerg!! Kerrigan, Abathur, Zagara, Dehaka, Stukov and other Zerg heroes have been called many times!",
        "不愧是Zerg 玩家！凯瑞甘、阿巴瑟、扎加拉、德哈卡、斯图科夫等虫族英雄多次被你征召！",
      ] : false
    }
  ],
  "WingsOfLiberty": [
    ["Wings of Liberty", "自由之翼"],
    function () {
      if (dataPersonal.PlayerHeroes[9] === undefined || dataPersonal.PlayerHeroes[10] === undefined || dataPersonal.PlayerHeroes[11] === undefined ||
        dataPersonal.PlayerHeroes[23] === undefined || dataPersonal.PlayerHeroes[42] === undefined || dataPersonal.PlayerHeroes[76] === undefined)
        return false
      var SgtHammer = dataPersonal.PlayerHeroes[9].game_total.sum > 0
      var Raynor = dataPersonal.PlayerHeroes[10].game_total.sum > 0
      var Nova = dataPersonal.PlayerHeroes[11].game_total.sum > 0
      var Tychus = dataPersonal.PlayerHeroes[23].game_total.sum > 0
      var LtMorales = dataPersonal.PlayerHeroes[42].game_total.sum > 0
      var Blaze = dataPersonal.PlayerHeroes[76].game_total.sum > 0
      var limit = SgtHammer + Raynor + Nova + Tychus + LtMorales + Blaze > 12
      return limit ? [
        "SCV is ready！ SgtHammer, Raynor, Nova, Tychus, LtMorales, Blazer and other Terran heroes have been called many times!",
        "SCV就绪！重锤军士、雷诺、诺娃、泰凯斯、莫拉莉斯中尉、布雷泽等人族英雄多次被你征召！",
      ] : false
    }
  ],
  "DeepDarkFantasy": [
    ["Deep ♂ Dark ♂ Fantasy", "Deep ♂ Dark ♂ Fantasy"],
    function () {
      if (dataPersonal.PlayerHeroes[20] === undefined || dataPersonal.PlayerHeroes[23] === undefined || dataPersonal.PlayerHeroes[70] === undefined)
        return false
      var Diablo = dataPersonal.PlayerHeroes[20].game_total.sum > 2 && ((dataPersonal.PlayerHeroes[20].game_total.sum / dataPersonal.PlayerHeroes[20].game_total.sum) > 0.5)
      var Tychus = dataPersonal.PlayerHeroes[23].game_total.sum > 2 && ((dataPersonal.PlayerHeroes[23].game_total.sum / dataPersonal.PlayerHeroes[23].game_total.sum) > 0.5)
      var Garrosh = dataPersonal.PlayerHeroes[70].game_total.sum > 2 && ((dataPersonal.PlayerHeroes[70].game_total.sum / dataPersonal.PlayerHeroes[70].game_total.sum) > 0.5)
      var limit = Diablo && Tychus && Garrosh
      return limit ? [
        "Boy ♂ Next ♂ Door！ Diablo, Tychus, Garrosh have been called many times! And their winning rate are all beyond 50%.",
        "Boy ♂ Next ♂ Door！迪亚波罗、泰凯斯、加尔鲁什多次被你征召！并且胜率都超过了 50%",
      ] : false
    }
  ],

  "Uther": [
    ["Silver Hand", "白银之手"], //乌瑟尔
    function () {
      var HeroID = 3
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "We are St. Cleveland! You have played Uther for " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Uther's global winning rate: " + HeroInf.GlobalWinRate + "%. The emotional revenge must not be allowed to occupy our consciousness.",
          "我们是圣骑士！本周你使用乌瑟尔完成了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%，乌瑟尔全球胜率：" + HeroInf.GlobalWinRate + "%。不要让仇恨蒙蔽了我们的双眼！"
        ] : false
      } else
        return false
    }
  ],
  "Raynor": [
    ["New Hero", "新英雄"], //雷诺
    function () {
      var HeroID = 10
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "Yippee-ki-yay! You have played Raynor for " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Raynor's global winning rate: " + HeroInf.GlobalWinRate + "%. Call on the good old Hyperion and blast the hell out of everything!",
          "好极了！本周你使用雷诺完成了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%，雷诺全球胜率：" + HeroInf.GlobalWinRate + "%。召唤休伯利安号，把敌人炸个稀巴烂！"
        ] : false
      } else return false
    }
  ],
  "Malfurion": [
    ["Tyrande’s Call", "泰兰德的呼唤"], //玛法里奥
    function () {
      var HeroID = 14
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "Even the lowliest spirit can destroy the most powerful of demons! You have played Malfurion " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Malfurion's global winning rate: " + HeroInf.GlobalWinRate + "%. Let our enemies beware!",
          "即使最弱小的精灵也能消灭最强大的恶魔！本周你使用玛法里奥完成了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%，玛法里奥全球胜率：" + HeroInf.GlobalWinRate + "%。小心，我们的敌人要注意到你了。"
        ] : false
      } else return false
    }
  ],
  "Illidan": [
    ["You Are Not Prepared", "千送伊"], //伊利丹
    function () {
      var HeroID = 16
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate > 50
        return limit ? [
          "They are not prepared! You have played Illidan for " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Illidan's global winning rate: " + HeroInf.GlobalWinRate + "%. At sometimes , the hand of fate must be forced.",
          "他们这是自寻死路！本周你使用伊利丹进行了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%，伊利丹全球胜率：" + HeroInf.GlobalWinRate + "%。有时候，命运之手必须掌握在自己手中"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate <= 50
        var rand = parseInt(Math.random() * 3)
        var event = [
          [
            "Feeling the...! And you have neither! You have have played Illidan for " + HeroInf.Games + " times, your winning rate is only " + HeroInf.WinRate + "%, Illidan's global winning rate is " + HeroInf.GlobalWinRate + "%. His hatred is unending!",
            "感受辶...英雄阵亡！本周你使用伊利丹进行了 " + HeroInf.Games + " 场游戏，胜率竟然才 " + HeroInf.WinRate + "%，伊利丹全球胜率：" + HeroInf.GlobalWinRate + "%。他心中的怒火无法平息无法平息！"
          ],
          [
            "You are...! And you have neither! You have have played Illidan for " + HeroInf.Games + " times, your winning rate is only " + HeroInf.WinRate + "%, Illidan's global winning rate is " + HeroInf.GlobalWinRate + "%. His hatred is unending!",
            "你们辶...英雄阵亡！本周你使用伊利丹进行了 " + HeroInf.Games + " 场游戏，胜率竟然才 " + HeroInf.WinRate + "%，伊利丹全球胜率：" + HeroInf.GlobalWinRate + "%。他心中的怒火无法平息无法平息！"
          ],
          [
            "Feeling the...! And you have neither! You have have played Illidan for " + HeroInf.Games + " times, your winning rate is only " + HeroInf.WinRate + "%, Illidan's global winning rate is " + HeroInf.GlobalWinRate + "%. His hatred is unending!",
            "如此弓...英雄阵亡！本周你使用伊利丹进行了 " + HeroInf.Games + " 场游戏，胜率竟然才 " + HeroInf.WinRate + "%，伊利丹全球胜率：" + HeroInf.GlobalWinRate + "%。他心中的怒火无法平息无法平息！"
          ]
        ]
        return limit ? event[rand] : false
      }

    }
  ],
  "Gazlowe": [
    ["Shelf Reed", "架子芦苇"], //加兹鲁维
    function () {
      var HeroID = 17
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "Time is money, friend. And you own them both! You have played Gazlowe for " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Gazlowe's global winning rate: " + HeroInf.GlobalWinRate + "%. Does this turn you on?",
          "时间就是金钱我的朋友，你全都要！本周你使用加兹鲁维完成了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%，加兹鲁维全球胜率：" + HeroInf.GlobalWinRate + "%。地精科技，震撼人心！这让你兴奋起来了么？"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate < 40
        return limit ? [
          "Time is money, friend! And you're out of both! You have played Gazlowe for " + HeroInf.Games + " times, your winning rate is only " + HeroInf.WinRate + "%, Gazlowe's global winning rate is " + HeroInf.GlobalWinRate + "%. Out of the way you nubgoblin. (Gazlowe's armor said)",
          "时间就是金钱我的朋友，而你两样都没有！本周你使用加兹鲁维完成了 " + HeroInf.Games + "场游戏，胜率才 " + HeroInf.WinRate + "%，加兹鲁维全球胜率：" + HeroInf.GlobalWinRate + "%。你这地精还不如客厅克星！"
        ] : false
      }

    }
  ],
  "Abathur": [
    ["Evolution Complete!", "进化完成"],//阿巴瑟 22
    function () {
      var HeroID = 22
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 50
        return limit ? [
          "Evolution Complete! Abathur appeared in the " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Abathur's global winning rate: " + HeroInf.GlobalWinRate + "%, good play! ",
          "进化成功！阿巴瑟登场了 " + HeroInf.Games + " 次，胜率达到了 " + HeroInf.WinRate + "%，阿巴瑟全球胜率：" + HeroInf.GlobalWinRate + "%，玩的不错！",
        ] : false
      } else return false
    }
  ],
  "LiLi": [
    ["Hey, A Flower", "嘿，一朵小花儿"], //丽丽 24
    function () {
      var HeroID = 24
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "Life is an adventure! You have played LiLi " + HeroInf.Games + " times , your winning rate is up to " + HeroInf.WinRate + "%, which higher than LiLi's global winning rate: " + HeroInf.GlobalWinRate + "%. Read for adventure?",
          "生命在于冒险！本周你使用丽丽进行了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%, 丽丽全球胜率：" + HeroInf.GlobalWinRate + "%。准备好去冒险了吗？"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate <= 45
        return limit ? [
          "(Sighs) you have played LiLi " + HeroInf.Games + " games, your winning rate is only " + HeroInf.WinRate + "%, LiLi's global winning rate is " + HeroInf.GlobalWinRate + "%. You make her a saaaad panda!",
          "哈，你这家伙就像只软脚虾！本周你使用丽丽进行了 " + HeroInf.Games + " 场游戏，胜率才 " + HeroInf.WinRate + "%, 丽丽全球胜率：" + HeroInf.GlobalWinRate + "%。哦～真没用～"
        ] : false
      }
    }
  ],
  "Murky": [
    ["Grglrgl！Lrgl grgrmrmlgr!", "Grglrgl！Lrgl grgrmrmlgr！"], //鱼人 26
    function () {
      var HeroID = 26
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate > 55
        return limit ? [
          "Wrlgmmglglgm! You have played Murky " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Murky's global winning rate: " + HeroInf.GlobalWinRate + "%. Rmlg! Grlmmrlm!",
          "Wrlgmmglglgm！你玩了 " + HeroInf.Games + " 局小鱼人，胜率达到了 " + HeroInf.WinRate + "%，小鱼人的全球胜率是 " + HeroInf.GlobalWinRate + "%。Rmlg！Grlmmrlm！",
        ] : false
      } else return false
    }
  ],
  "Sylvanas": [
    ["Banshee Queen", "女妖之王"], //希尔瓦娜斯 35
    function () {
      var HeroID = 35
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 50
        return limit ? [
          "The Dark Lady watches over you. You have played Sylvanas " + HeroInf.Games + " times , your winning rate is up to " + HeroInf.WinRate + "%, which higher than Sylvanas's global winning rate: " + HeroInf.GlobalWinRate + "%. Victory for the Forsaken!",
          "黑暗女王注视着你。本周你使用希尔瓦娜斯进行了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%, 希尔瓦娜斯全球胜率：" + HeroInf.GlobalWinRate + "%。胜利属于被遗忘着！"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate <= 43
        return limit ? [
          "I have no time for games! You have used Sylvanas to have " + HeroInf.Games + " games, your winning rate is only " + HeroInf.WinRate + "%, Sylvanas's global winning rate is " + HeroInf.GlobalWinRate + "%. Do not try my patience!",
          "我可没时间陪你玩游戏！本周你使用希尔瓦娜斯进行了 " + HeroInf.Games + " 场游戏，胜率才 " + HeroInf.WinRate + "%, 希尔瓦娜斯全球胜率：" + HeroInf.GlobalWinRate + "%。不要考验我的耐心！"
        ] : false
      }
    }
  ],
  "Butcher": [
    ["Meat!Meat!Meat!", "新鲜的肉！"], //屠夫
    function () {
      var HeroID = 38
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 5 && HeroInf.WinRate >= 55
        return limit ? [
          "There is no doubt that you have mastered the skills of using the Butcher's Slayer. Your Butcher's winning percentage is " + HeroInf.WinRate + "%, while the Butcher's global winning rate is " + HeroInf.GlobalWinRate + "%",
          "毫无疑问，你掌握了如何使用屠龙刀的技巧，你的屠夫的胜率是 " + HeroInf.WinRate + "%,而全球屠夫平均胜率是 " + HeroInf.GlobalWinRate + "%",
        ] : false
      } else {
        var limit = HeroInf.Games >= 5 && HeroInf.WinRate <= 45
        return limit ? [
          "Your Butcher's WinRate is " + HeroInf.WinRate + "%, while the Butcher's global winning rate: " + HeroInf.GlobalWinRate + "%. Mastering the right way to eat meat is the only way for  Butcher to win. P.S. At the beginning of game Butcher should try to eat XP or Gank.",
          "你的屠夫的胜率是 " + HeroInf.WinRate + "%,而全球屠夫平均胜率是 " + HeroInf.GlobalWinRate + "%,掌握正确的吃肉方法才是屠夫的取胜之道。PS:前期屠夫可以尝试多吃线攒肉游走抓单",
        ] : false
      }
    }
  ],
  "Lunara": [
    ["hahahahaha", "哈哈哈哈哈"], //露娜拉
    function () {
      var HeroID = 46
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          " Hahahahaha! Hahahahaha! You have played Lunara " + HeroInf.Games + " times , your winning rate is up to " + HeroInf.WinRate + "%, which higher than Lunara's global winning rate: " + HeroInf.GlobalWinRate + "%. The forest doesn't need protection, but you do (^_^)v ",
          " 哈哈哈哈哈，哈哈哈哈哈！本周你使用露娜拉进行了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%，露娜拉全球胜率：" + HeroInf.GlobalWinRate + "%。森林不需要保护，但你需要(^_^)v "
        ] : false
      } else return false
    }
  ],
  "Medivh": [
    ["The Last Guardian", "最后的守护者"], //麦迪文
    function () {
      var HeroID = 53
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "You are the Prophet! You have played Medivh " + HeroInf.Games + " times , your winning rate is up to " + HeroInf.WinRate + "%, which higher than Medivh's global winning rate: " + HeroInf.GlobalWinRate + "%. What can I say? Coooooooool play!",
          "你就是先知！本周你使用麦迪文进行了 " + HeroInf.Games + " 场游戏，胜率高达 " + HeroInf.WinRate + "%, 麦迪文全球胜率：" + HeroInf.GlobalWinRate + "%。我还能说什么，麦迪斌玩的不错！"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate <= 40
        return limit ? [
          "That's stupid! I foresee the future, seeing the burning shadows that are about to swallow the world, You have used Medivh to have " + HeroInf.Games + " games, your winning rate is only " + HeroInf.WinRate + "%, Medivh's global winning rate is " + HeroInf.GlobalWinRate + "%.",
          "那可真蠢，我预见到了未来，看到了即将吞噬这个世界的燃烧著的阴影。本周你使用麦迪文进行了 " + HeroInf.Games + " 场游戏，胜率才 " + HeroInf.WinRate + "%, 麦迪文全球胜率：" + HeroInf.GlobalWinRate + "%。下一位忠奸人就是你了！"
        ] : false
      }
    }
  ],
  "Alarak": [
    ["Krisol thok aran!", "骚骚可浪"],//坚果 56
    function () {
      var HeroID = 56
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games > 7 && HeroInf.WinRate > 50
        return limit ? [
          "General Performance, I personally appeared " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Alarak's global winning rate: " + HeroInf.GlobalWinRate + "%, next time I will consider helping you again. ",
          "表现还行，我亲自登场了 " + HeroInf.Games + " 次，胜率达到了 " + HeroInf.WinRate + "%，全球的高阶领主平均胜率是 " + HeroInf.GlobalWinRate + "%，下次我会考虑再帮你的",
        ] : false
      } else {
        var limit = HeroInf.Games > 7 && HeroInf.WinRate <= 50
        return limit ? [
          "Such a shame, I personally appeared " + HeroInf.Games + " times, your winning rate is only " + HeroInf.WinRate + "%, Alarak's global winning rate is " + HeroInf.GlobalWinRate + "%, Plz do not pick me again! ",
          "真是丢人现眼，我亲自登场了 " + HeroInf.Games + " 次，胜率才 " + HeroInf.WinRate + "%，全球的高阶领主平均胜率都有 " + HeroInf.GlobalWinRate + "%，不要再让我登场了！",
        ] : false
      }
    }
  ],
  "Varian": [
    ["High King", "至高王"], //瓦里安 59
    function () {
      var HeroID = 59
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "Glory for the Alliance! You have played Varian " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Varian's global winning rate: " + HeroInf.GlobalWinRate + "%. Justice is at hand! For Azeroth!",
          "联盟的荣耀！本周你使用瓦里安进行了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%, 瓦里安全球胜率：" + HeroInf.GlobalWinRate + "%。正义就在眼前！为了艾泽拉斯！"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate <= 45
        return limit ? [
          "Let's see how you fight! You have used Varian to have " + HeroInf.Games + " games, your winning rate is only " + HeroInf.WinRate + "%, Varian' global winning rate is " + HeroInf.GlobalWinRate + "%. Do what a king must do!",
          "让我来看看你是如何战斗的！本周你使用瓦里安进行了 " + HeroInf.Games + " 场游戏，胜率只有 " + HeroInf.WinRate + "%, 瓦里安全球胜率：" + HeroInf.GlobalWinRate + "%。做一个国王应该做的事！"
        ] : false
      }
    }
  ],
  "Ragnaros": [
    ["The Firelord", "炎魔之王"], //螺丝 60
    function () {
      var HeroID = 60
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "By fire be PURGED! You have played Ragnaros " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Ragnaros's global winning rate: " + HeroInf.GlobalWinRate + "%. Burn those bugs with fire!",
          "让火焰净化一切！本周你使用拉格纳罗斯进行了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%, 拉格纳罗斯全球胜率：" + HeroInf.GlobalWinRate + "%。用火焰把那些虫子燃烧殆尽！"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate <= 45
        return limit ? [
          "DIE, INSECT! You have used Ragnaros to have " + HeroInf.Games + " games, your winning rate is only " + HeroInf.WinRate + "%, Ragnaros' global winning rate is " + HeroInf.GlobalWinRate + "%. Calculating the timing of the pit, sometimes it is a good choice to use D in the enemy's back.",
          "死吧，虫子！本周你使用拉格纳罗斯进行了 " + HeroInf.Games + " 场游戏，胜率只有 " + HeroInf.WinRate + "%, 拉格纳罗斯全球胜率：" + HeroInf.GlobalWinRate + "%。掌握上炕的时机，有时候绕后上炕也是一个不错的选择"
        ] : false
      }
    }
  ],
  "Genji": [
    ["Happy Darter", "快乐镖男"], //源氏 66
    function () {
      var HeroID = 66
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate > 58
        return limit ? [
          "Play to win! You have played Genji " + HeroInf.Games + " times , your winning rate is up to " + HeroInf.WinRate + "%, which higher than Genji's global winning rate: " + HeroInf.GlobalWinRate + "%. You are a qualified Happy Darter.",
          "玩游戏就是要赢！本周你使用源氏进行了 " + HeroInf.Games + " 场游戏，胜率竟然达到了 " + HeroInf.WinRate + "%, 源氏全球胜率：" + HeroInf.GlobalWinRate + "%。你是一位合格的快乐镖男！"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate < 42
        return limit ? [
          "Poor insect! You have played Genji " + HeroInf.Games + " games, I can't believe your winning rate is only " + HeroInf.WinRate + "%, Genji's global winning rate is " + HeroInf.GlobalWinRate + "%. You need healing!",
          "卑微的苍蝇！本周你使用源氏进行了 " + HeroInf.Games + " 场游戏，胜率竟然才 " + HeroInf.WinRate + "%, 源氏全球胜率：" + HeroInf.GlobalWinRate + "%。哼，啊嚯噶！"
        ] : false
      }
    }
  ],
  "Garrosh": [
    ["Hellscream", "地狱咆哮"], //加尔鲁什 70
    function () {
      var HeroID = 70
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "For Hellscream! You have played Garrosh " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Garrosh's global winning rate: " + HeroInf.GlobalWinRate + "%. You scream, I screams, we all scream for Hellscream!",
          "为了地狱咆哮！本周你使用加尔鲁什进行了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%，加尔鲁什全球胜率：" + HeroInf.GlobalWinRate + "%。拿出你的血性跟我一起怒吼，向敌人释放你心中的地狱咆哮！"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate < 45
        return limit ? [
          "You will serve the Horde, or be crushed beneath it! You have played Garrosh " + HeroInf.Games + " times, your winning rate is only " + HeroInf.WinRate + "%, Garrosh's global winning rate is " + HeroInf.GlobalWinRate + "%. Do you want to receive his little surprise party?",
          "要么为部落效忠，要么被部落碾碎！本周你使用加尔鲁什完成了 " + HeroInf.Games + " 场游戏，胜率只有 " + HeroInf.WinRate + "%，加尔鲁什全球胜率：" + HeroInf.GlobalWinRate + "%。你也想收到加尔鲁什的惊喜派对吗？"
        ] : false
      }
    }
  ],
  "Alexstrasza": [
    ["Life-Binder", "生命缚誓者"], //阿莱克丝塔萨 74
    function () {
      var HeroID = 74
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate >= 55
        return limit ? [
          "New life blooms! You have played Alexstrasza " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Alexstrasza's global winning rate: " + HeroInf.GlobalWinRate + "%. You bring life and hope!",
          "新的生命将在烈焰中绽放！本周你使用阿莱克丝塔萨进行了 " + HeroInf.Games + " 场游戏，胜率达到了 " + HeroInf.WinRate + "%，阿莱克丝塔萨全球胜率：" + HeroInf.GlobalWinRate + "%。你带来了生命和希望！"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate < 45
        return limit ? [
          "Take heart, heroes, life will always blossom from the darkest soil! You have played Alexstrasza " + HeroInf.Games + " times, your winning rate is only " + HeroInf.WinRate + "%, Alexstrasza's global winning rate is " + HeroInf.GlobalWinRate + "%. Life is good, life is beautiful, life is even strange. What it certainly is not, however, is a highway. Do not lose hope.",
          "振作起来，英雄们，生命总会在最黑暗的地方绽放！本周你使用阿莱克丝塔萨完成了 " + HeroInf.Games + " 场游戏，胜率只有 " + HeroInf.WinRate + "%，阿莱克丝塔萨全球胜率：" + HeroInf.GlobalWinRate + "%。生命很美好，生命很美丽，生命甚至有各种机缘，但再怎么样，生命也不会一帆风顺的，别失去希望"
        ] : false
      }
    }
  ],
  "Maiev": [
    ["Where is Illidan?", "伊利丹在哪？"], //玛维 //Warden 77
    function () {
      var HeroID = 77
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate > 57
        return limit ? [
          "You are Maiev Master! You have played Maiev " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Maiev's global winning rate: " + HeroInf.GlobalWinRate + "%. You are a qualified Happy Darter.",
          "玛维的取胜技巧已被你掌握，本周你使用玛维进行了 " + HeroInf.Games + " 场游戏，胜率高达 " + HeroInf.WinRate + "%, 玛维全球胜率：" + HeroInf.GlobalWinRate + "%。"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate < 43
        return limit ? [
          "The hunter is nothing without the hunted. You have played Maiev " + HeroInf.Games + " games, your winning rate is only " + HeroInf.WinRate + "%, Maiev's global winning rate is " + HeroInf.GlobalWinRate + "%.The key is master the time of her abilities E and D,and the accuracy of her Q.",
          "一个猎手失去了猎物就会一无所有。本周你使用玛维进行了 " + HeroInf.Games + " 场游戏，胜率竟然才 " + HeroInf.WinRate + "%, 玛维全球胜率：" + HeroInf.GlobalWinRate + "%。用好玛维的 E 和 D ，并且提高 Q 的精确度，能提高不少胜率！"
        ] : false
      }
    }
  ],
  "Fenix": [
    ["Phoenix", "凤凰骑士"], //菲尼克斯 78
    function () {
      var HeroID = 78
      var HeroInf = getHeroInf(HeroID)
      if (HeroInf.Games === undefined) return false
      if (HeroInf.WinRate > HeroInf.GlobalWinRate) {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate > 57
        return limit ? [
          "En taro Adun! You have played Maiev " + HeroInf.Games + " times, your winning rate is up to " + HeroInf.WinRate + "%, which higher than Fenix's global winning rate: " + HeroInf.GlobalWinRate + "%. Never underestimate the strength of a dragoon.",
          "En taro Adun！本周你使用菲尼克斯进行了 " + HeroInf.Games + " 场游戏，胜率高达 " + HeroInf.WinRate + "%, 菲尼克斯全球胜率：" + HeroInf.GlobalWinRate + "%。不要低估一名龙骑士的战斗力"
        ] : false
      } else {
        var limit = HeroInf.Games >= 10 && HeroInf.WinRate < 43
        return limit ? [
          "En taro Adun! You have played Maiev " + HeroInf.Games + " games, your winning rate is only " + HeroInf.WinRate + "%, Fenix's global winning rate is " + HeroInf.GlobalWinRate + "%. Drop your weapon! You have 15 seconds to comply!",
          "En taro Adun！本周你使用菲尼克斯进行了 " + HeroInf.Games + " 场游戏，胜率竟然才 " + HeroInf.WinRate + "%, 菲尼克斯全球胜率：" + HeroInf.GlobalWinRate + "%。放下武器，你还有15秒可以投降！"
        ] : false
      }
    }
  ],

  /*   //大饼
  "Zeratul": [//泽拉图 id:1  I appears the veil of the future, and behold only……oblivion. 
      //我挑开了未来的面纱，却只看到了……湮灭。
  ],
  "Tyrande": [//泰兰德 id:4 愿艾露恩与你同在 愿月光女神照耀你
  ],
  "Arthas": [//阿尔萨斯 id:21 霜之哀伤，饿了 我的眼前……一片黑暗…… 孩子， 当你出生的时候，洛丹伦的森林轻声唤出了你的名字 阿尔萨斯 而你，将加冕为王。
  ],
  "Chen": [//陈 id:29 护国安邦惩奸恶、道法自然除心魔
  ],
  "Leoric": [//李奥瑞克 id:39 我将与你们并肩作战，直到我生命的最后一刻
  ],
  */
  "ForTheAlliance": [
    ["For the Alliance", "为了联盟"],
    function () {
      if (dataPersonal.PlayerHeroes[3] === undefined || dataPersonal.PlayerHeroes[4] === undefined || dataPersonal.PlayerHeroes[13] === undefined ||
        dataPersonal.PlayerHeroes[18] === undefined || dataPersonal.PlayerHeroes[32] === undefined || dataPersonal.PlayerHeroes[36] === undefined ||
        dataPersonal.PlayerHeroes[47] === undefined || dataPersonal.PlayerHeroes[53] === undefined || dataPersonal.PlayerHeroes[59] === undefined ||
        dataPersonal.PlayerHeroes[80] === undefined)
        return false
      var Uther = dataPersonal.PlayerHeroes[3].game_total.sum > 0
      var Tyrande = dataPersonal.PlayerHeroes[4].game_total.sum > 0
      var Muradin = dataPersonal.PlayerHeroes[13].game_total.sum > 0
      var Falstad = dataPersonal.PlayerHeroes[18].game_total.sum > 0
      var Jaina = dataPersonal.PlayerHeroes[32].game_total.sum > 0
      var Kaelthas = dataPersonal.PlayerHeroes[36].game_total.sum > 0
      var Greymane = dataPersonal.PlayerHeroes[47].game_total.sum > 0
      var Medivh = dataPersonal.PlayerHeroes[53].game_total.sum > 0
      var Varian = dataPersonal.PlayerHeroes[59].game_total.sum > 0
      var Yrel = dataPersonal.PlayerHeroes[80].game_total.sum > 0
      var limit = Uther && Tyrande && Muradin && Falstad && Jaina && Kaelthas && Greymane && Medivh && Varian && Yrel
      return limit ? [
        "For the Alliance！ All Alliance heroes have been called!",
        "为了联盟！ 所有联盟将士们都被你征召",
      ] : false
    }
  ],
  "ForTheHorde": [
    ["For The Horde", "为了部落"],
    function () {
      if (dataPersonal.PlayerHeroes[19] === undefined || dataPersonal.PlayerHeroes[28] === undefined || dataPersonal.PlayerHeroes[33] === undefined ||
        dataPersonal.PlayerHeroes[35] === undefined || dataPersonal.PlayerHeroes[41] === undefined || dataPersonal.PlayerHeroes[54] === undefined ||
        dataPersonal.PlayerHeroes[58] === undefined || dataPersonal.PlayerHeroes[61] === undefined || dataPersonal.PlayerHeroes[70] === undefined)
        return false
      var ETC = dataPersonal.PlayerHeroes[19].game_total.sum > 0
      var Rehgar = dataPersonal.PlayerHeroes[28].game_total.sum > 0
      var Thrall = dataPersonal.PlayerHeroes[33].game_total.sum > 0
      var Sylvanas = dataPersonal.PlayerHeroes[35].game_total.sum > 0
      var Rexxar = dataPersonal.PlayerHeroes[41].game_total.sum > 0
      var Guldan = dataPersonal.PlayerHeroes[54].game_total.sum > 0
      var Samuro = dataPersonal.PlayerHeroes[58].game_total.sum > 0
      var Zuljin = dataPersonal.PlayerHeroes[61].game_total.sum > 0
      var Garrosh = dataPersonal.PlayerHeroes[70].game_total.sum > 0
      var limit = ETC && Rehgar && Thrall && Sylvanas && Rexxar && Guldan && Samuro && Zuljin && Garrosh
      return limit ? [
        "Lok'tar ogar！All Horde heroes have been called!",
        "Lok'tar ogar！所有部落战士们多次被你征召！",
      ] : false
    }
  ],
  "Energetic": [
    ["Energetic", "精力充沛"],
    function () {
      var games = dataPersonal.PlayerBase.game_total.sum
      if (games < 10)
        return false
      if (10 < games < 100) {
        return [
          "Coooooool！ You played " + games + " times",
          "风暴暖暖！你总共玩了 " + games + " 局",
        ]
      }
      if (games > 100) {
        return [
          "Amazing！ You played " + games + " times",
          "肝帝就是你啦！你总共玩了 " + games + " 局",
        ]
      }
    }
  ],
  "BoyfriendsOfJaina": [
    ["Boyfriends Of Jaina", "吉安娜的男友们"], //阿尔萨斯，萨尔，凯尔萨斯
    function () {
      if (dataPersonal.PlayerHeroes[21] === undefined || dataPersonal.PlayerHeroes[33] === undefined ||
        dataPersonal.PlayerHeroes[36] === undefined)
        return false
      var Arthas = dataPersonal.PlayerHeroes[21].game_total.sum > 2
      var Thrall = dataPersonal.PlayerHeroes[33].game_total.sum > 2
      var Kaelthas = dataPersonal.PlayerHeroes[36].game_total.sum > 2
      var tot = (dataPersonal.PlayerHeroes[21].game_total.sum + dataPersonal.PlayerHeroes[33].game_total.sum + dataPersonal.PlayerHeroes[36].game_total.sum) > 10
      var limit = Arthas && Thrall && Kaelthas && tot
      return limit ? [
        "You've played a lot Boyfriends of Jaina, cheer up warriors, sooner, Jaina shall be yours!",
        "这周你玩了许多局吉安娜的男友们，加油勇士，吉安娜就快是你的了！",
      ] : false
    }
  ],
  "DiabloVillains": [
    ["Diablo Villains", "暗黑恶棍"], //李奥瑞克，屠夫，迪亚波罗
    function () {
      if (dataPersonal.PlayerHeroes[39] === undefined || dataPersonal.PlayerHeroes[38] === undefined ||
        dataPersonal.PlayerHeroes[20] === undefined)
        return false
      var Leoric = dataPersonal.PlayerHeroes[39].game_total.sum > 5
      var Butcher = dataPersonal.PlayerHeroes[38].game_total.sum > 5
      var Diablo = dataPersonal.PlayerHeroes[20].game_total.sum > 5

      var limit = Leoric && Butcher && Diablo
      return limit ? [
        "This week, your challenges were accepted by the Diablo Villains -- Leoric, the Butcher and Diablo who fought for you for many times!",
        "这周暗黑恶棍李奥瑞克、屠夫、迪亚波罗三人接受了你的挑战，多次为你而战！",
      ] : false
    }
  ],
  "LovingAndHurting": [
    ["Loving And Hurting", "相爱相杀"], //玛维，伊利丹
    function () {
      if (dataPersonal.PlayerHeroes[77] === undefined || dataPersonal.PlayerHeroes[16] === undefined)
        return false
      var Maiev = dataPersonal.PlayerHeroes[77].game_total.sum > 5
      var Illidan = dataPersonal.PlayerHeroes[16].game_total.sum > 5
      var limit = Maiev && Illidan
      return limit ? [
        "IIIIIIIIIlidan in danger！Maiev and Illidan have fought (and love) in front of you for many times！Embrace the pleasure of imprisoning some one for 10 thousand years!",
        "丹丹丹丹丹丹丹哥危险！这周玛维和伊利丹多次在你的屏幕前相爱相杀，感受这囚禁别人一万年的快乐吧！",
      ] : false
    }
  ],
  "ForTheLove": [
    ["For The Love", "因为爱情"], //泰兰德，伊利丹
    function () {
      if (dataPersonal.PlayerHeroes[4] === undefined || dataPersonal.PlayerHeroes[16] === undefined)
        return false
      var Tyrande = dataPersonal.PlayerHeroes[4].game_total.sum > 5
      var Illidan = dataPersonal.PlayerHeroes[16].game_total.sum > 5
      var limit = Tyrande && Illidan
      return limit ? [
        "You know, for ten thousand years old Tyrande still looks pretty good. Illidan and Tyrande have shown multiple times around this week. May Elune‘s around you forever.",
        "你知道，一万年了，泰兰德还是那么美。这周泰兰德和伊利丹多次在你这里出现，愿艾露恩与你同在！",
      ] : false
    }
  ],
  "NightElfBetrayer": [
    ["Night Elf Betrayer", "暗夜精灵背叛者"], //伊利丹，玛法里奥
    function () {
      if (dataPersonal.PlayerHeroes[16] === undefined || dataPersonal.PlayerHeroes[14] === undefined)
        return false
      var Illidan = dataPersonal.PlayerHeroes[16].game_total.sum > 5
      var Malfurion = dataPersonal.PlayerHeroes[14].game_total.sum > 5
      var limit = Illidan && Malfurion
      return limit ? [
        "So be it, brother. Illidan and Malfurion have taken a lot tasks for you together in the combat. Hope to end from this day forward, let there be peace between them.",
        "那就这样吧，兄弟。这周玛法里奥和伊利丹共同承担了你的多场战斗任务。希望从今以后他们之间能够保持和平",
      ] : false
    }
  ],
  "HappyFamily": [
    ["Happy Family", "相亲相爱一家人"], //玛法里奥，泰兰德，伊利丹
    function () {
      if (dataPersonal.PlayerHeroes[14] === undefined || dataPersonal.PlayerHeroes[4] === undefined ||
        dataPersonal.PlayerHeroes[16] === undefined)
        return false
      var Malfurion = dataPersonal.PlayerHeroes[14].game_total.sum > 5
      var Tyrande = dataPersonal.PlayerHeroes[4].game_total.sum > 5
      var Illidan = dataPersonal.PlayerHeroes[16].game_total.sum > 5
      var limit = Malfurion && Tyrande && Illidan
      return limit ? [
        "It's important for the family members to stay together！You have used Malfurion, Tyrande and Illidan in your battles for many times!",
        "一家人最重要的就是整整齐齐！这周你使用玛法里奥、泰兰德和伊利丹完成了许多场战斗！",
      ] : false
    }
  ],
  "Stormstout": [
    ["Stormstout", "风暴烈酒"], //陈，丽丽
    function () {
      if (dataPersonal.PlayerHeroes[29] === undefined || dataPersonal.PlayerHeroes[24] === undefined)
        return false
      var Chen = dataPersonal.PlayerHeroes[29].game_total.sum > 5
      var LiLi = dataPersonal.PlayerHeroes[24].game_total.sum > 5
      var limit = Chen && LiLi
      return limit ? [
        "Everyone you meet is a story. Every place you go is an adventure. Every drink you have is the best you've ever tasted. Chen and Lily have fought with you for many times in the Nexus. This is not such a bad life, is it?",
        "每个你遇到的人都应是一个故事;每个你经过的地方都应是一场冒险;每杯你或独酌或畅饮的酒水都应是琼汁玉露。这周老陈和丽丽多次与你并肩作战时空枢纽。生活，其实是美好的，不是吗？",
      ] : false
    }
  ],
  "Undercity": [
    ["Undercity", "幽暗城"], //希尔瓦娜斯，缝合怪
    function () {
      if (dataPersonal.PlayerHeroes[7] === undefined || dataPersonal.PlayerHeroes[35] === undefined)
        return false
      var Stitches = dataPersonal.PlayerHeroes[7].game_total.sum > 5
      var Sylvanas = dataPersonal.PlayerHeroes[35].game_total.sum > 5
      var limit = Stitches && Sylvanas
      return limit ? [
        "Undercity Collection! Sylvanas have been called " + Sylvanas + " times, And Stitches " + Stitches + " times",
        "幽暗城通关！ 希尔瓦娜斯被征召了 " + Sylvanas + " 次，缝合怪被征召了 " + Stitches + " 次",
      ] : false
    }
  ],
  "StarCraftRebels": [
    ["StarCraft Rebels", "星际叛军"], //雷诺，凯瑞甘，泰凯斯
    function () {
      if (dataPersonal.PlayerHeroes[10] === undefined || dataPersonal.PlayerHeroes[15] === undefined || dataPersonal.PlayerHeroes[23] === undefined)
        return false
      var Raynor = dataPersonal.PlayerHeroes[10].game_total.sum > 5
      var Kerrigan = dataPersonal.PlayerHeroes[15].game_total.sum > 5
      var Tychus = dataPersonal.PlayerHeroes[23].game_total.sum > 5
      var limit = Raynor && Kerrigan && Tychus
      return limit ? [
        "Triangle Relation! Raynor have been called " + Raynor + " times,  Tychus " + Tychus + " times,and Kerrigan " + Kerrigan + " times",
        "三角关系！ 雷诺被征召了 " + Raynor + " 次，泰凯斯被征召了 " + Tychus + " 次，凯瑞甘被征召了 " + Kerrigan + " times",
      ] : false
    }
  ],
  "AngirisCouncil": [
    ["Angiris Council", "天使议会"], //泰瑞尔，奥莉尔，马萨伊尔
    function () {
      if (dataPersonal.PlayerHeroes[5] === undefined || dataPersonal.PlayerHeroes[55] === undefined || dataPersonal.PlayerHeroes[68] === undefined)
        return false
      var Tyrael = dataPersonal.PlayerHeroes[5].game_total.sum > 5
      var Auriel = dataPersonal.PlayerHeroes[55].game_total.sum > 5
      var Malthael = dataPersonal.PlayerHeroes[68].game_total.sum > 5
      var limit = Tyrael && Auriel && Malthael
      return limit ? [
        "We are no one! Tyrael have been called " + Tyrael + " times,  Auriel " + Auriel + " times,and Malthael " + Malthael + " times",
        "我们都是无面者！ 泰瑞尔被征召了 " + Tyrael + " 次，奥莉尔被征召了 " + Auriel + " 次，马萨伊尔被征召了 " + Malthael + " times",
      ] : false
    }
  ],
  "UnitedProtoss": [
    ["United Protoss", "统一星灵"], //泽拉图，塔萨达，阿塔尼斯
    function () {
      if (dataPersonal.PlayerHeroes[1] === undefined || dataPersonal.PlayerHeroes[6] === undefined || dataPersonal.PlayerHeroes[43] === undefined)
        return false
      var Zeratul = dataPersonal.PlayerHeroes[1].game_total.sum > 5
      var Tassadar = dataPersonal.PlayerHeroes[6].game_total.sum > 5
      var Artanis = dataPersonal.PlayerHeroes[43].game_total.sum > 5
      var limit = Zeratul && Tassadar && Artanis
      return limit ? [
        "For Aier! Zeratul have been called " + Zeratul + " times,  Tassadar " + Tassadar + " times,and Artanis " + Artanis + " times",
        "为了艾尔！ 泽拉图被征召了 " + Zeratul + " 次，塔萨达尔被征召了 " + Tassadar + " 次，阿塔尼斯被征召了 " + Artanis + " times",
      ] : false
    }
  ],
  "DoubleTrouble": [
    ["Double Trouble", "双重麻烦"], //古，加尔
    function () {
      if (dataPersonal.PlayerHeroes[44] === undefined || dataPersonal.PlayerHeroes[45] === undefined)
        return false
      var Cho = dataPersonal.PlayerHeroes[44].game_total.sum > 0
      var Gall = dataPersonal.PlayerHeroes[45].game_total.sum > 0
      var tot = (dataPersonal.PlayerHeroes[44].game_total.sum + dataPersonal.PlayerHeroes[45].game_total.sum) > 10
      var limit = Cho && Gall && tot
      return limit ? [
        "Behold the might of the Hammer! Cho have been called " + Cho + " times,  Gall " + Gall + " times",
        "见证暮光之锤的力量！ 古被征召了 " + Cho + " 次，加尔被征召了 " + Gall + " 次",
      ] : false
    }
  ],
  "ReignofChaos": [
    ["Reign of Chaos", "混乱之治"], //乌瑟尔，阿尔萨斯，吉安娜，萨尔
    function () {
      if (dataPersonal.PlayerHeroes[3] === undefined || dataPersonal.PlayerHeroes[21] === undefined || dataPersonal.PlayerHeroes[32] === undefined ||
        dataPersonal.PlayerHeroes[33] === undefined)
        return false
      var Uther = dataPersonal.PlayerHeroes[3].game_total.sum > 5
      var Arthas = dataPersonal.PlayerHeroes[21].game_total.sum > 5
      var Jiana = dataPersonal.PlayerHeroes[32].game_total.sum > 5
      var Thrall = dataPersonal.PlayerHeroes[33].game_total.sum > 5
      var limit = Uther && Arthas && Jiana && Thrall
      return limit ? [
        "Chaos! Who will be the Winner?!  Uther have been called " + Uther + " times,  Arthas " + Arthas + " times,  Jiana " + Jiana + " times,  Thrall " + Thrall + " times",
        "竞争混乱，谁才是最后的赢家？！ 乌瑟尔被征召了 " + Uther + " 次，阿尔萨斯被征召了 " + Arthas + " 次，吉安娜被征召了 " + Jiana + " 次，萨尔被征召了 " + Thrall + " 次",
      ] : false
    }
  ],
  "ShimadaClan": [
    ["Shimada Clan", "岛田家族"], //源氏，半藏
    function () {
      if (dataPersonal.PlayerHeroes[66] === undefined || dataPersonal.PlayerHeroes[75] === undefined)
        return false
      var Genji = dataPersonal.PlayerHeroes[66].game_total.sum > 5
      var Hanzo = dataPersonal.PlayerHeroes[75].game_total.sum > 5
      var GenjiWinRate = (dataPersonal.PlayerHeroes[66].game_win.sum / dataPersonal.PlayerHeroes[66].game_total.sum * 100).toFixed(2)
      var HanzoWinRate = (dataPersonal.PlayerHeroes[75].game_win.sum / dataPersonal.PlayerHeroes[75].game_total.sum * 100).toFixed(2)
      var limit = Genji && Hanzo && GenjiWinRate > 55 && HanzoWinRate > 55
      return limit ? [
        "The Unity Of The Dragon And The Man!  Genji have been called " + Genji + " times,with the " + GenjiWinRate + "% WinRate,Hanzo have been called " + Hanzo + " times,with the " + HanzoWinRate + "% WinRate",
        "人龙合一！ 源氏被征召了 " + Genji + " 次，有着 " + GenjiWinRate + "%胜率。半藏被征召了 " + Hanzo + " 次，有着 " + HanzoWinRate + "%胜率",
      ] : false
    }
  ],
  "FantasticFour": [
    ["Fantastic Four", "神奇四侠"], //源氏，半藏，猎空，狂鼠
    function () {
      if (dataPersonal.PlayerHeroes[51] === undefined || dataPersonal.PlayerHeroes[66] === undefined || dataPersonal.PlayerHeroes[73] === undefined || dataPersonal.PlayerHeroes[75] === undefined)
        return false
      var Tracer = dataPersonal.PlayerHeroes[51].game_total.sum > 5
      var Genji = dataPersonal.PlayerHeroes[66].game_total.sum > 5
      var Junkrat = dataPersonal.PlayerHeroes[73].game_total.sum > 5
      var Hanzo = dataPersonal.PlayerHeroes[75].game_total.sum > 5
      var TracerWinRate = (dataPersonal.PlayerHeroes[66].game_win.sum / dataPersonal.PlayerHeroes[51].game_total.sum * 100).toFixed(2)
      var GenjiWinRate = (dataPersonal.PlayerHeroes[66].game_win.sum / dataPersonal.PlayerHeroes[66].game_total.sum * 100).toFixed(2)
      var JunkratWinRate = (dataPersonal.PlayerHeroes[66].game_win.sum / dataPersonal.PlayerHeroes[73].game_total.sum * 100).toFixed(2)
      var HanzoWinRate = (dataPersonal.PlayerHeroes[75].game_win.sum / dataPersonal.PlayerHeroes[75].game_total.sum * 100).toFixed(2)
      var limit = Tracer && Genji && Junkrat && Hanzo && TracerWinRate > 50 && GenjiWinRate > 50 && JunkratWinRate > 50 && HanzoWinRate > 50
      return limit ? [
        "World needs more heros!  Tracer have been called " + Tracer + " times,with the " + TracerWinRate + "% WinRate,Genji have been called " + Genji + " times,with the " + GenjiWinRate + "% WinRate," +
        "Junkrat have been called " + Junkrat + " times,with the " + JunkratWinRate + "% WinRate," + "Hanzo have been called " + Hanzo + " times,with the " + HanzoWinRate + "% WinRate",

        "这个世界需要更多的英雄！猎空被征召了 " + Tracer + " 次，有着 " + TracerWinRate + "%胜率。源氏被征召了 " + Genji + " 次，有着 " + GenjiWinRate + "%胜率。" +
        "狂鼠被征召了 " + Junkrat + " 次，有着 " + JunkratWinRate + "%胜率。半藏被征召了 " + Hanzo + " 次，有着 " + HanzoWinRate + "%胜率",
      ] : false
    }
  ],
  "InTheShadow": [
    ["InTheShadow", "来自阴影"], //泽拉图，诺娃，萨穆罗，瓦莉拉
    function () {
      if (dataPersonal.PlayerHeroes[1] === undefined || dataPersonal.PlayerHeroes[11] === undefined || dataPersonal.PlayerHeroes[58] === undefined || dataPersonal.PlayerHeroes[62] === undefined)
        return false
      var Zeratul = dataPersonal.PlayerHeroes[1].game_total.sum > 5
      var Nova = dataPersonal.PlayerHeroes[11].game_total.sum > 5
      var Samuro = dataPersonal.PlayerHeroes[58].game_total.sum > 5
      var Valeera = dataPersonal.PlayerHeroes[62].game_total.sum > 5
      var limit = Zeratul && Nova && Samuro && Valeera
      return limit ? [
        "The thrill of slaughtering enemies in the shadows erodes your soul.This week you have called many times Stealth hero,Zeratul,Nova,Samuro and Valeera",
        "在阴影中屠杀敌人的快感侵蚀着你的灵魂。这周隐身系英雄，泽拉图、诺娃、萨穆罗、瓦莉拉多次被你征召",
      ] : false
    }
  ], //经验用Exp还是XP表示
  "ExperienceContributionWinRate": [
    ["Where is my XP ?", "经验值都去哪了？"], //经验贡献
    function () {
      var WinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
      var GlobalWinRate = (dataGlobal.PlayerBase.game_win.sum / dataGlobal.PlayerBase.game_total.sum * 100).toFixed(2)
      var Exp = Math.round(dataPersonal.PlayerBase.ExperienceContribution.sum / dataPersonal.PlayerBase.game_total.sum)
      var GlobalExp = Math.round(dataGlobal.PlayerBase.ExperienceContribution.sum / dataGlobal.PlayerBase.game_total.sum)
      if (WinRate > GlobalWinRate || Exp >= GlobalExp)
        return false
      return [
        "This week,your winning rate is " + WinRate + "%, your average XP contribution per game is " + Exp + ", and the average global XP contribution  is " + GlobalExp,
        "你这周的胜率是 " + WinRate + "%，你平均每场为团队贡献的经验值是 " + Exp + "，全球平均每场玩家贡献的经验值是 " + GlobalExp,
      ]
    }
  ],
  "CampWinRate": [
    ["Take The Camp!", "夺取雇佣兵！"], //雇佣兵
    function () {
      var WinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
      var GlobalWinRate = (dataGlobal.PlayerBase.game_win.sum / dataGlobal.PlayerBase.game_total.sum * 100).toFixed(2)
      var Camp = Math.round(dataPersonal.PlayerBase.MercCampCaptures.sum / dataPersonal.PlayerBase.game_total.sum)
      var GlobalCamp = Math.round(dataGlobal.PlayerBase.MercCampCaptures.sum / dataGlobal.PlayerBase.game_total.sum)
      if (WinRate > GlobalWinRate || Camp >= GlobalCamp)
        return false
      return [
        "This week,your winning rate is " + WinRate + "%, your average Camp Captures per game is " + Camp + " times, and the average global Camp Captures is " + GlobalCamp + " times",
        "你这周的胜率是 " + WinRate + "%，你平均每场占领了 " + Camp + " 次雇佣兵营地，全球平均每场玩家占领雇佣兵营地次数是 " + GlobalCamp + " 次",
      ]
    }
  ],
}

var HeroInf = { 1: ['Zeratul', '泽拉图'], 2: ['Valla', '维拉'], 3: ['Uther', '乌瑟尔'], 4: ['Tyrande', '泰兰德'], 5: ['Tyrael', '泰瑞尔'], 6: ['Tassadar', '塔萨达尔'], 7: ['Stitches', '缝合怪'], 8: ['Sonya', '桑娅'], 9: ['SgtHammer', '重锤军士'], 10: ['Raynor', '雷诺'], 11: ['Nova', '诺娃'], 12: ['Nazeebo', '纳兹波'], 13: ['Muradin', '穆拉丁'], 14: ['Malfurion', '玛法里奥'], 15: ['Kerrigan', '凯瑞甘'], 16: ['Illidan', '伊利丹'], 17: ['Gazlowe', '加兹鲁维'], 18: ['Falstad', '弗斯塔德'], 19: ['etc', '精英牛头人酋长'], 20: ['Diablo', '迪亚波罗'], 21: ['Arthas', '阿尔萨斯'], 22: ['Abathur', '阿巴瑟'], 23: ['Tychus', '泰凯斯'], 24: ['LiLi', '丽丽'], 25: ['Brightwing', '光明之翼'], 26: ['Murky', '奔波尔霸'], 27: ['Zagara', '扎加拉'], 28: ['Rehgar', '雷加尔'], 29: ['Chen', '陈'], 30: ['Azmodan', '阿兹莫丹'], 31: ['Anubarak', '阿努巴拉克'], 32: ['Jaina', '吉安娜'], 33: ['Thrall', '萨尔'], 34: ['LostVikings', '失落的维京人'], 35: ['Sylvanas', '希尔瓦娜斯'], 36: ['Kaelthas', '凯尔萨斯'], 37: ['Johanna', '乔汉娜'], 38: ['Butcher', '屠夫'], 39: ['Leoric', '李奥瑞克'], 40: ['Kharazim', '卡拉辛姆'], 41: ['Rexxar', '雷克萨'], 42: ['LtMorales', '莫拉莉斯中尉'], 43: ['Artanis', '阿塔尼斯'], 44: ['Cho', '古'], 45: ['Gall', '加尔'], 46: ['Lunara', '露娜拉'], 47: ['Greymane', '格雷迈恩'], 48: ['LiMing', '李敏'], 49: ['Xul', '祖尔'], 50: ['Dehaka', '德哈卡'], 51: ['Tracer', '猎空'], 52: ['Chromie', '克罗米'], 53: ['Medivh', '麦迪文'], 54: ['Guldan', '古尔丹'], 55: ['Auriel', '奥莉尔'], 56: ['Alarak', '阿拉纳克'], 57: ['Zarya', '查莉娅'], 58: ['Samuro', '萨穆罗'], 59: ['Varian', '瓦里安'], 60: ['Ragnaros', '拉格纳罗斯'], 61: ['Zuljin', '祖尔金'], 62: ['Valeera', '瓦莉拉'], 63: ['Lucio', '卢西奥'], 64: ['Probius', '普罗比斯'], 65: ['Cassia', '卡西娅'], 66: ['Genji', '源氏'], 67: ['DVa', 'D.Va'], 68: ['Malthael', '马萨伊尔'], 69: ['Stukov', '斯托科夫'], 70: ['Garrosh', '加尔鲁什'], 71: ['Kelthuzad', '克尔苏加德'], 72: ['Ana', '安娜'], 73: ['Junkrat', '狂鼠'], 74: ['Alexstrasza', '阿莱克丝塔萨'], 75: ['Hanzo', '半藏'], 76: ['Blaze', '布雷泽'], 77: ['Maiev', '玛维'], 78: ['Fenix', '菲尼克斯'], 79: ['Deckard', '迪卡德'] }

function getHeroInf(HeroID) {
  if (HeroInf[HeroID] === undefined) return false
  if (dataPersonal.PlayerHeroes[HeroID] !== undefined) {
    var Play = dataPersonal.PlayerHeroes[HeroID].game_total.sum
    var Length = dataPersonal.PlayerHeroes[HeroID].game_length.sum
    var Win = dataPersonal.PlayerHeroes[HeroID].game_win.sum
    var WinRate = Play ? (Win / Play * 100).toFixed(2) : 0
  }
  if (dataGlobal.PlayerHeroes[HeroID] !== undefined) {
    var GlobalPlay = dataGlobal.PlayerHeroes[HeroID].game_total.sum
    var GlobalLength = dataGlobal.PlayerHeroes[HeroID].game_length.sum
    var GlobalWin = dataGlobal.PlayerHeroes[HeroID].game_win.sum
    var GlobalWinRate = GlobalPlay ? (GlobalWin / GlobalPlay * 100).toFixed(2) : 0
  }
  return {
    name_en: HeroInf[HeroID][0],
    name_cn: HeroInf[HeroID][1],
    Play: Play,
    Length: Length,
    Win: Win,
    WinRate: WinRate,
    GlobalPlay: GlobalPlay,
    GlobalLength: GlobalLength,
    GlobalWin: GlobalWin,
    GlobalWinRate: GlobalWinRate,
  }
}

var Top3 = function () {//击杀 ，阵亡，KDA，雇佣兵，经验
    var herolist = []
    for (var hero in dataPersonal.PlayerHeroes) {
        if (dataPersonal.PlayerHeroes[hero].game_total.sum > 0) {
            herolist.pust([dataPersonal.PlayerHeroes[hero].game_total.sum, hero])
        }
    }
    herolist.sort(function ([a, b], [c, d]) { return a < c })
    var top3 = []

    for (var i = 0; i < 3; i++) {
        if (i >= herolist.length)
            break;
        var Kills = 0//dataPersonal.PlayerBase.Takedowns.sum
        var Games = 0
        var GlobalKills = 0//dataGlobal.PlayerBase.Takedowns.sum
        var inf = {
            "heroID": herolist[i][1],
            "items": [
                {
                    "title": "击杀",
                    "point": 0,
                },
                {
                    "title": "阵亡",
                    "point": 0,
                },
                {
                    "title": "KDA",
                    "point": 0,
                },
                {
                    "title": "雇佣兵",
                    "point": 0,
                },
                {
                    "title": "经验",
                    "point": 0,
                },
            ],
        }
        top3.push(inf)
    }
    return top3
}

var ranking = {}
