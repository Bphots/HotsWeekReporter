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
    var D = date.getDate() + " ";
    var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}
var counter = {
    "WeekLength": [
        ["Length", "周时长"],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length.sum / 60)
            return [
                data + " minutes",
                data + " 分钟"
            ]
        }
    ],
    "WeekTimes": [
        ["Times", "周场次"],
        function () {
            var data = dataPersonal.PlayerBase.game_total.sum
            return [
                data + " times",
                data + " 局"
            ]
        }
    ],
    "WeekWin": [
        ["Win", "周胜场"],
        function () {
            var data = dataPersonal.PlayerBase.game_win.sum
            return [
                data + " times",
                data + " 局"
            ]
        }
    ],
    "WeekMostUsed": [
        ["Most Used Heroes", "使用最多的英雄"],
        function () {
            var item = dataPersonal.PlayerHeroes._sumMax.game_total
            var heroID = item[0]
            var times = item[1]
            return [
                "Hero " + heroID + " was used " + times + " times",
                "英雄 " + heroID + " 被使用了 " + times + " 次"
            ]
        }
    ],
    "WeekQuickMatch_length": [
        ["Quick Match Length", "快速比赛时长"],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_QuickMatch.sum / 60)
            return [
                data + " minutes",
                data + " 分钟"
            ]
        }
    ],
    "week_QuickMatch_avg_length": [
        ["Quick Match Avg Length", "快速比赛平均时长"],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_QuickMatch.sum
            var count = dataPersonal.PlayerBase.game_total_QuickMatch.sum
            return count > 0 ? [
                ((sum / 60) / count).toFixed(0) + " minutes",
                ((sum / 60) / count).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
    "week_HeroLeague_length": [
        ["Hero League Length", "英雄联赛时长"],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_HeroLeague.sum / 60)
            return [
                data + " minutes",
                data + " 分钟"
            ]
        }
    ],
    "week_HeroLeague_avg_length": [
        ["Hero League Avg Length", "英雄联赛平均时长"],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_HeroLeague.sum / 60
            var count = dataPersonal.PlayerBase.game_total_HeroLeague.sum
            return count > 0 ? [
                (sum / count).toFixed(0) + " minutes",
                (sum / count).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
    "week_TeamLeague_length": [
        ["Team League Length", "团队联赛时长"],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_TeamLeague.sum / 60)
            return [
                data + " minutes",
                data + " 分钟"
            ]
        }
    ],
    "week_TeamLeague_avg_length": [
        ["Team League Avg Length", "团队联赛平均时长"],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_TeamLeague.sum
            var count = dataPersonal.PlayerBase.game_total_TeamLeague.sum
            return count > 0 ? [
                (sum / count / 60).toFixed(0) + " minutes",
                (sum / count / 60).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
    "week_UnrankedDraft_length": [
        ["Unranked Draft Length", "非排名模式时长"],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_UnrankedDraft.sum / 60)
            return [
                data + " minutes",
                data + " 分钟"
            ]
        }
    ],
    "week_UnrankedDraft_avg_length": [
        ["Unranked Draft Avg Length", "非排名模式平均时长"],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_UnrankedDraft.sum
            var count = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
            return count > 0 ? [
                (sum / count / 60).toFixed(0) + " minutes",
                (sum / count / 60).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
    "WeekQuickMatch_total": [
        ["Quick Match Total", "快速比赛总场次"],
        function () {
            var sum = dataPersonal.PlayerBase.game_total_QuickMatch.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "WeekHeroLeague_total": [
        ["Hero League Total", "英雄联赛总场次"],
        function () {
            var sum = dataPersonal.PlayerBase.game_total_HeroLeague.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "WeekTeamLeague_total": [
        ["Team League Total", "团队联赛总场次"],
        function () {
            var sum = dataPersonal.PlayerBase.game_total_TeamLeague.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "WeekUnrankedDraft_total": [
        ["Unranked Draft Total", "非排名模式总场次"],
        function () {
            var sum = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "WeekQuickMatch_win": [
        ["Quick Match Win", "快速比赛胜场"],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_QuickMatch.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "WeekHeroLeague_win": [
        ["Hero League Win", "英雄联赛胜场"],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_HeroLeague.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "WeekTeamLeague_win": [
        ["Team League Win", "团队联赛胜场"],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_TeamLeague.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "WeekUnrankedDraft_win": [
        ["Unranked Draft Win", "非排名模式胜场"],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_UnrankedDraft.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "WeekQuickMatch_win_rate": [
        ["Quick Match Win Rate", "快速比赛胜率"],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_QuickMatch.sum
            var count = dataPersonal.PlayerBase.game_total_QuickMatch.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    "WeekHeroLeague_win_rate": [
        ["Hero League Wins Rate", "英雄联赛胜率"],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_HeroLeague.sum
            var count = dataPersonal.PlayerBase.game_total_HeroLeague.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    "WeekTeamLeague_win_rate": [
        ["Team League Win Rate", "团队联赛胜率"],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_TeamLeague.sum
            var count = dataPersonal.PlayerBase.game_total_TeamLeague.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    "WeekUnrankedDraft_win_ate": [
        ["Unranked Draft Win Rate", "非排名模式胜率"],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_UnrankedDraft.sum
            var count = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    "week_party_total": [
        ["Premades total", "开黑次数"],
        function () {
            var sum = dataPersonal.PlayerBase.party_total.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    //1-2
    "week_party_win": [
        ["Premades win", "开黑获胜次数"],
        function () {
            var sum = dataPersonal.PlayerBase.party_win.sum
            return [
                sum + " times",
                sum + " 局"
            ]
        }
    ],
    "week_party_win_rate": [
        ["Premades Win Rate", "开黑胜率"],
        function () {
            var sum = dataPersonal.PlayerBase.party_win.sum
            var count = dataPersonal.PlayerBase.party_total.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    "week_team1_count": [
        ["Played In Team 1", "在右上方的游戏次数"],
        function () {
            var sum = dataPersonal.PlayerBase.team1_count.sum
            return [
                sum + " times",
                sum + " 次"
            ]
        }
    ],
    "week_level": [
        ["Average Level", "平均等级(游戏结束时)"],
        function () {
            var sum = dataPersonal.PlayerBase.Level.sum
            var count = dataPersonal.PlayerBase.game_total.sum
            if (count <= 0)
                return false;
            var avgLvl = sum / count;
            return [
                avgLvl.toFixed(0),
                avgLvl.toFixed(0) + " 级",
            ]
        }
    ],
    "week_take_downs": [
        ["Take Downs", "总参与击杀"],
        function () {
            var sum = dataPersonal.PlayerBase.Takedowns.sum
            return [
                sum + " times",
                sum + " 次"
            ]
        }
    ],
    "week_solo_kills": [
        ["Solo Kills", "最后一击"],
        function () {
            var sum = dataPersonal.PlayerBase.SoloKills.sum
            return [
                sum + " times",
                sum + " 次"
            ]
        }
    ],
    "week_assists": [
        ["Assists", "助攻"],
        function () {
            var sum = dataPersonal.PlayerBase.Assists.sum
            return [
                sum + " times",
                sum + " 次"
            ]
        }
    ],
    "week_deaths": [
        ["Deaths", "死亡"],
        function () {
            var sum = dataPersonal.PlayerBase.Deaths.sum
            return [
                sum + " times",
                sum + " 次"
            ]
        }
    ],
    "week_avg_highest_kill_streak": [
        ["Average Highest Kill Streak", "平均最高连杀"],
        function () {
            var avg = dataPersonal.PlayerBase.HighestKillStreak.sum
            var game = dataPersonal.PlayerBase.game_total.sum
            return [
                (avg / game).toFixed(0) + " times",
                (avg / game).toFixed(0) + " 次",
            ]
        }
    ],
    "week_max_level": [
        ["Max Level Reached", "最高等级"],
        function () {
            var arr = object_to_array(dataPersonal.PlayerBase.Level_count.sum)
            var data = arr[arr.length - 1]
            return [
                data,
                data + " 级"
            ]
        }
    ],
    "week_min_level": [
        ["Min Level Reached", "最低等级"],
        function () {
            var arr = object_to_array(dataPersonal.PlayerBase.Level_count.sum)
            var data = arr[0]
            return [
                data,
                data + " 级"
            ]
        }
    ],
    "week_hero_damage": [
        ["Hero Damage", "英雄总伤害"],
        function () {
            var sum = dataPersonal.PlayerBase.HeroDamage.sum
            return [
                sum,
                sum + " 伤害"
            ]
        }
    ],
    "week_siege_damage": [
        ["Siege Damage", "攻城总伤害"],
        function () {
            var sum = dataPersonal.PlayerBase.SiegeDamage.sum
            return [
                sum,
                sum + " 伤害"
            ]
        }
    ],
    "week_structure_damage": [
        ["Structure Damage", "建筑总伤害"],
        function () {
            var sum = dataPersonal.PlayerBase.StructureDamage.sum
            return [
                sum,
                sum + " 伤害"
            ]
        }
    ],
    "week_minion_damage": [
        ["Minion Damage", "小兵总伤害"],
        function () {
            var sum = dataPersonal.PlayerBase.MinionDamage.sum
            return [
                sum,
                sum + " 伤害"
            ]
        }
    ],
    //creepdamage
    "week_creep_damage": [
        ["Creep Damage", "地图机制总伤害"],
        function () {
            var sum = dataPersonal.PlayerBase.CreepDamage.sum
            return [
                sum,
                sum + " 伤害"
            ]
        }
    ],
    "week_summon_damage": [
        ["Summon Damage", "召唤物总伤害"],
        function () {
            var data = dataPersonal.PlayerBase.SummonDamage.sum
            return [
                data,
                data + " 伤害"
            ]
        }
    ],
    "week_TimeCCd_enemy_heroes": [
        ["Enemy Heroes CC Length", "控制敌方英雄总时长"],
        function () {
            var sum = dataPersonal.PlayerBase.TimeCCdEnemyHeroes.sum
            return [
                sum + " second",
                sum + " 秒"
            ]
        }
    ],
    "week_self_healing": [
        ["Self Healing", "自我治疗"],
        function () {
            var sum = dataPersonal.PlayerBase.SelfHealing.sum
            return [
                sum + " heal",
                sum + " 点治疗"
            ]
        }
    ],
    "week_experience_contribution": [
        ["Experience Contribution", "经验贡献"],
        function () {
            var sum = dataPersonal.PlayerBase.ExperienceContribution.sum
            return [
                sum,
                sum + " 经验"
            ]
        }
    ],
    "week_healing": [
        ["Healing", "治疗"],
        function () {
            var sum = dataPersonal.PlayerBase.Healing.sum
            return [
                sum,
                sum + " 点治疗"
            ]
        }
    ],
    "WeekWinRate": [
        ["Win Rate", "周胜率"],
        function () {
            var win = dataPersonal.PlayerBase.game_win.sum
            var games = dataPersonal.PlayerBase.game_total.sum
            if (games <= 0)
                return false;
            var rate = win / games;
            return [
                rate.toFixed(2) * 100 + "%",
                rate.toFixed(2) * 100 + "%",
            ]
        }
    ],
    "MrecCamp": [
        ["MercCamp Captures", "雇佣兵占领次数"],
        function () {
            var times = dataPersonal.PlayerBase.MercCampCaptures.sum
            return [
                times,
                times + " 次",
            ]
        }
    ],
    "TimeSilencing": [
        ["Enemy Heroes Silenced", "沉默敌人的时间"],
        function () {
            var times = dataPersonal.PlayerBase.TimeSilencingEnemyHeroes.sum
            return [
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    "TimeRooting": [
        ["Enemy Heroes Rooted", "定身敌人的时间"],
        function () {
            var times = dataPersonal.PlayerBase.TimeRootingEnemyHeroes.sum
            return [
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    "TimeStunning": [
        ["Enemy Heroes Stunned", "眩晕敌人的时间"],
        function () {
            var times = dataPersonal.PlayerBase.TimeStunningEnemyHeroes.sum
            return [
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    "ClutchHealsPerformed": [
        ["Clutch Heals Performed", "关键治疗次数"],
        function () {
            var times = dataPersonal.PlayerBase.ClutchHealsPerformed.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    "EscapesPerformed": [
        ["Escapes Performed", "死里逃生次数"],
        function () {
            var times = dataPersonal.PlayerBase.EscapesPerformed.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    "VengeancesPerformed": [
        ["Vengeances Performed", "复仇次数"],
        function () {
            var times = dataPersonal.PlayerBase.VengeancesPerformed.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    "TeamfightEscapesPerformed": [
        ["Teamfight Escapes Performed", "团战逃脱的次数"],
        function () {
            var times = dataPersonal.PlayerBase.TeamfightEscapesPerformed.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    "OutnumberedDeaths": [
        ["Outnumbered Deaths", "被Gank的次数"],
        function () {
            var times = dataPersonal.PlayerBase.OutnumberedDeaths.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    "WinsWarrior": [
        ["Wins Warrior", "战斗型英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsWarrior.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "WinsAssassin": [
        ["Wins Assassin", "刺杀型英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsAssassin.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "WinsSupport": [
        ["Wins Support", "辅助型英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsAssassin.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "WinsSpecialist": [
        ["Wins Specialist", "专业型英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsSpecialist.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "WinsStarCraft": [
        ["Wins StarCraft", "星际英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsStarCraft.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "WinsDiablo": [
        ["Wins Diablo", "暗黑英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsDiablo.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "WinsWarcraft": [
        ["Wins Warcraft", "魔兽英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsWarcraft.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "WinsMale": [
        ["Wins Male", "男性英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsMale.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "WinsFemale": [
        ["Wins Female", "女性英雄胜场"],
        function () {
            var times = dataPersonal.PlayerBase.WinsFemale.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "GamesOfWarrior": [
        ["Tanks Played", "战斗型英雄局数"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysWarrior.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "GamesOfAssassin": [
        ["Assassins Played", "刺杀型英雄局数"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysAssassin.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "GamesOfSupport": [
        ["Support Played", "治疗型英雄局数"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysSupport.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "GamesOfSpecialist": [
        ["Specialist Played", "专业型英雄局数"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysSpecialist.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "GamesOfMale": [
        ["Male Played", "男性英雄局数"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysMale.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "GamesOfFemale": [
        ["Female Played", "女性英雄局数"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysFemale.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "WinRateOfWarrior": [
        ["Tanks WinRate", "战斗型英雄胜率"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysWarrior.sum
            if (games <= 0)
                return false
            var wins = dataPersonal.PlayerBase.WinsWarrior.sum
            var WinRate = (wins / games * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "WinRateOfAssassin": [
        ["Assassins WinRate", "刺杀型英雄胜率"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysAssassin.sum
            if (games <= 0)
                return false
            var wins = dataPersonal.PlayerBase.WinsAssassin.sum
            var WinRate = (wins / games * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "WinRateOfSupport": [
        ["Support WinRate", "治疗型英雄胜率"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysSupport.sum
            if (games <= 0)
                return false
            var wins = dataPersonal.PlayerBase.WinsSupport.sum
            var WinRate = (wins / games * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "WinRateOfSpecialist": [
        ["Specialist WinRate", "专业型英雄胜率"],
        function () {
            var games = dataPersonal.PlayerBase.PlaysSpecialist.sum
            if (games <= 0)
                return false
            var wins = dataPersonal.PlayerBase.WinsSpecialist.sum
            var WinRate = (wins / games * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "TimesOfDtagon": [
        ["Take Dragons In This Week", "开启龙骑士次数"],
        function () {
            var games = dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum
            return [
                games + " times",
                games + " 次"
            ]
        }
    ],
    "TimesOfDtagonShrines": [
        ["DragonSrines Taken", "占领龙骑士祭坛次数"],
        function () {
            var games = dataPersonal.PlayerBase.DragonShrinesCaptured.sum
            return [
                games + " times",
                games + " 次"
            ]
        }
    ],
    "NumbersOfGardensSeeds": [
        ["GardensSeeds Collected", "收集花园种子总数"],
        function () {
            var count = dataPersonal.PlayerBase.GardensSeedsCollected.sum
            return [
                count,
                count + " 个"
            ]
        }
    ],
    "DamageOfGardensPlant": [
        ["GardensPlant Damage", "恐魔总伤害量"],
        function () {
            var dmg = dataPersonal.PlayerBase.GardensPlantDamage.sum
            return [
                dmg,
                dmg
            ]
        }
    ],
    "DamageDoneOfAltar": [
        ["Altar Damage Done", "占领天空殿祭坛造成的总伤害量"],
        function () {
            var dmg = dataPersonal.PlayerBase.AltarDamageDone.sum
            return [
                dmg,
                dmg
            ]
        }
    ],
    "DamageToImmortal": [
        ["Damage Done To Immortal", "对不朽者总伤害量"],
        function () {
            var dmg = dataPersonal.PlayerBase.DamageDoneToImmortal.sum
            return [
                dmg,
                dmg
            ]
        }
    ],
    "GemsTurned": [
        ["Gems Turned In", "上交宝石总量"],
        function () {
            var count = dataPersonal.PlayerBase.GemsTurnedIn.sum
            return [
                count,
                count
            ]
        }
    ],
    "RavenCollected": [
        ["Raven Tributes Collected", "乌鸦诅咒收集总量"],
        function () {
            var count = dataPersonal.PlayerBase.RavenTributesCollected.sum
            return [
                count,
                count
            ]
        }
    ],
    "MinesCollected": [
        ["Mines Skulls Collected", "鬼灵矿收集总量"],
        function () {
            var count = dataPersonal.PlayerBase.MinesSkullsCollected.sum
            return [
                count,
                count
            ]
        }
    ],
    "DoubloonsCollected": [
        ["Black Heart Doubloons Collected", "达布隆币收集总量"],
        function () {
            var count = dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
            return [
                count,
                count
            ]
        }
    ],
    "DoubloonsTurnedIn": [
        ["Black Heart Doubloons Turned In", "达布隆币上交总量"],
        function () {
            var count = dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
            return [
                count,
                count
            ]
        }
    ],
    "TimesInTemple": [
        ["Time In Temple", "天空殿占领祭坛总时间"],
        function () {
            var count = dataPersonal.PlayerBase.TimeInTemple.sum
            return [
                count + " seconds",
                count + " s"
            ]
        }
    ],
    "NukeDamage": [
        ["Nuke Damage Done", "核弹头总伤害"],
        function () {
            var dmg = dataPersonal.PlayerBase.NukeDamageDone.sum
            return [
                dmg,
                dmg
            ]
        }
    ],
    "2_Plays_total": [
        ["The Games of 2 Premades", "两人开黑场数"],
        function () {
            var count = dataPersonal.PlayerBase.party_total_2.sum;

            return [
                count,
                count
            ]
        }
    ],
    "3_Plays_total": [
        ["The Games of 3 Premades", "三人开黑场数"],
        function () {
            var count = dataPersonal.PlayerBase.party_total_3.sum;

            return [
                count,
                count
            ]
        }
    ],
    "4_Plays_total": [
        ["The Games 4 Premades", "四人开黑场数"],
        function () {
            var count = dataPersonal.PlayerBase.party_total_4.sum;

            return [
                count,
                count
            ]
        }
    ],
    "5_Plays_total": [
        ["The Games 5 Premades", "五人开黑场数"],
        function () {
            var count = dataPersonal.PlayerBase.party_total_5.sum;

            return [
                count,
                count
            ]
        }
    ],
    "2_WinRate": [
        ["The Win Rate of 2 Premades", "两人开黑胜率"],
        function () {
            var count = dataPersonal.PlayerBase.party_total_2.sum;
            if (count <= 0)
                return false;

            var WinRate = (dataPersonal.PlayerBase.party_win_2.sum / dataPersonal.PlayerBase.party_total_2.sum * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "3_WinRate": [
        ["The Win Rate of 3 Premades", "三人开黑胜率"],
        function () {
            var count = dataPersonal.PlayerBase.party_total_3.sum;
            if (count <= 0)
                return false;

            var WinRate = (dataPersonal.PlayerBase.party_win_3.sum / dataPersonal.PlayerBase.party_total_3.sum * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "4_WinRate": [
        ["The WinRate of 4 Premades", "四人开黑胜率"],
        function () {
            var count = dataPersonal.PlayerBase.party_total_4.sum;
            if (count <= 0)
                return false;

            var WinRate = (dataPersonal.PlayerBase.party_win_4.sum / dataPersonal.PlayerBase.party_total_4.sum * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "5_WinRate": [
        ["The WinRate of 5 Premades", "五人开黑胜率"],
        function () {
            var count = dataPersonal.PlayerBase.party_total_5.sum;
            if (count <= 0)
                return false;

            var WinRate = (dataPersonal.PlayerBase.party_win_5.sum / dataPersonal.PlayerBase.party_win_5.sum * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "MapsLength": [
        ["Total Duration Played On Each Map", "地图游戏时间"],
        function () {
            var map_time = dataPersonal.PlayerBase.maps_length.sum
            return [
                map_time,
                map_time
            ]

        }
    ],
    "MapsTimes": [
        ["Times Played On Each Map ", "地图游戏次数"],
        function () {
            var map_total = dataPersonal.PlayerBase.maps_total.sum
            return [
                map_total,
                map_total
            ]

        }
    ],
    "MapsWin": [
        ["Wins On Each Map ", "地图胜场数"],
        function () {
            var map_win = dataPersonal.PlayerBase.maps_win.sum
            return [
                map_win,
                map_win
            ]

        }
    ],
    "LevelAchieve": [
        ["Team Level At End Of The Game", "游戏结束时的等级"],
        function () {
            var level_gameEnd = dataPersonal.PlayerBase.Level_count.sum
            return [
                level_gameEnd,
                level_gameEnd
            ]

        }
    ],
    "LastGameTime": [
        ["Duration Of The Last Game", "上一次游戏时间"],
        function () {
            var duration = timestamptotime(dataPersonal.PlayerBase.last_game_time.max)
            return [
                duration,
                duration
            ]
        }
    ],
    "WeekGlobalMostUsed": [
        ["Global Most Used Heroes", "全球使用最多的英雄"],
        function () {
            var item = dataGlobal.PlayerHeroes._sumMax.game_total
            var heroID = item[0]
            var times = item[1]
            return [
                "Hero " + heroID + " was used " + times + " times",
                "英雄 " + heroID + " 被使用了 " + times + " 次"
            ]
        }
    ],
    "WeekGlobalTimes": [
        ["Global Times", "全球场次"],
        function () {
            var count = dataGlobal.PlayerBase.game_total.sum
            return [
                count + " times",
                count + " 局"
            ]
        }
    ],
    "WeekGlobalLength": [
        ["Global Length", "全球时长"],
        function () {
            var data = Math.round(dataGlobal.PlayerBase.game_length.sum / 60)
            return [
                data + " minutes",
                data + " 分钟"
            ]
        }
    ],
    "WeekGlobalWin": [
        ["Global Win", "全球胜场"],
        function () {
            var data = dataGlobal.PlayerBase.game_win.sum
            return [
                data + " times",
                data + " 局"
            ]
        }
    ],
    "WeekGlobalMostWinInHeroLeague": [
        ["Global Most Win Heroes In Hero League", "英雄联赛全球胜率最高的英雄"],
        function () {
            var heroID = 0
            var WinRate = 0
            for (var hero in dataGlobal.PlayerHeroes) {
                if (dataGlobal.PlayerHeroes[hero].game_total_HeroLeague.sum > 0) {
                    var Rate = (dataGlobal.PlayerHeroes[hero].game_win_HeroLeague.sum / dataGlobal.PlayerHeroes[hero].game_total_HeroLeague.sum * 100).toFixed(2)
                    if (Rate > WinRate && dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum > 5) {
                        WinRate = Rate
                        heroID = parseInt(hero)
                    }
                }
            }
            if (WinRate <= 0)
                return false
            return [
                "Hero " + heroID + " Hero League WinRate is  " + WinRate + "%",
                "英雄 " + heroID + " 英雄联赛胜率是 " + WinRate + "%"
            ]
        }
    ],
    "WeekGlobalMostWinInTeamLeague": [
        ["Global Most Win Heroes In Team League", "团队联赛全球胜率最高的英雄"],
        function () {
            var heroID = 0
            var WinRate = 0
            for (var hero in dataGlobal.PlayerHeroes) {
                if (dataGlobal.PlayerHeroes[hero].game_total_TeamLeague.sum > 0) {
                    var Rate = (dataGlobal.PlayerHeroes[hero].game_win_TeamLeague.sum / dataGlobal.PlayerHeroes[hero].game_total_TeamLeague.sum * 100).toFixed(2)
                    if (Rate > WinRate && dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum > 5) {
                        WinRate = Rate
                        heroID = parseInt(hero)
                    }
                }
            }
            if (WinRate <= 0)
                return false
            return [
                "Hero " + heroID + " Team League WinRate is  " + WinRate + "%",
                "英雄 " + heroID + " 团队联赛胜率是 " + WinRate + "%"
            ]
        }
    ],
    "WeekGlobalMostWinInQuickMatch": [
        ["Global Most Win Heroes In Quick Match", "快速比赛全球胜率最高的英雄"],
        function () {
            var heroID = 0
            var WinRate = 0
            for (var hero in dataGlobal.PlayerHeroes) {
                if (dataGlobal.PlayerHeroes[hero].game_total_QuickMatch.sum > 0) {
                    var Rate = (dataGlobal.PlayerHeroes[hero].game_win_QuickMatch.sum / dataGlobal.PlayerHeroes[hero].game_total_QuickMatch.sum * 100).toFixed(2)
                    if (Rate > WinRate && dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum > 5) {
                        WinRate = Rate
                        heroID = parseInt(hero)
                    }
                }
            }
            if (WinRate <= 0)
                return false
            return [
                "Hero " + heroID + " Quick Match WinRate is  " + WinRate + "%",
                "英雄 " + heroID + " 快速比赛胜率是 " + WinRate + "%"
            ]
        }
    ],
    "WeekGlobalMostWinInUnrankedDraft": [
        ["Global Most Win Heroes In Unranked Draft", "非排名模式全球胜率最高的英雄"],
        function () {
            var heroID = 0
            var WinRate = 0
            for (var hero in dataGlobal.PlayerHeroes) {
                if (dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum > 0) {
                    var Rate = (dataGlobal.PlayerHeroes[hero].game_win_UnrankedDraft.sum / dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum * 100).toFixed(2)
                    if (Rate > WinRate && dataGlobal.PlayerHeroes[hero].game_total_UnrankedDraft.sum > 5) {
                        WinRate = Rate
                        heroID = parseInt(hero)
                    }
                }
            }
            if (WinRate <= 0)
                return false
            return [
                "Hero " + heroID + " Unranked Draft WinRate is  " + WinRate + "%",
                "英雄 " + heroID + " 非排名模式胜率是 " + WinRate + "%"
            ]
        }
    ],
    "GlobalWinsWarrior": [
        ["Global Wins Warrior", "战斗型英雄全球胜场"],
        function () {
            var times = dataGlobal.PlayerBase.WinsWarrior.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "GlobalWinsAssassin": [
        ["Global Wins Assassin", "刺杀型英雄全球胜场"],
        function () {
            var times = dataGlobal.PlayerBase.WinsAssassin.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "GlobalWinsSupport": [
        ["Global Wins Support", "辅助型英雄全球胜场"],
        function () {
            var times = dataGlobal.PlayerBase.WinsAssassin.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "GlobalWinsSpecialist": [
        ["Global Wins Specialist", "专业型英雄全球胜场"],
        function () {
            var times = dataGlobal.PlayerBase.WinsSpecialist.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    "GlobalGamesOfWarrior": [
        ["Global Tanks Played", "战斗型英雄全球局数"],
        function () {
            var games = dataGlobal.PlayerBase.PlaysWarrior.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "GlobalGamesOfAssassin": [
        ["Global Assassins Played", "刺杀型英雄全球局数"],
        function () {
            var games = dataGlobal.PlayerBase.PlaysAssassin.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "Global GamesOfSupport": [
        ["Global Plays Support", "治疗型英雄全球局数"],
        function () {
            var games = dataGlobal.PlayerBase.PlaysSupport.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "GlobalGamesOfSpecialist": [
        ["Global Plays Specialist", "专业型英雄全球局数"],
        function () {
            var games = dataGlobal.PlayerBase.PlaysSpecialist.sum
            return [
                games + " times",
                games + " 局"
            ]
        }
    ],
    "GlobalWinRateOfWarrior": [
        ["Global Tanks WinRate", "战斗型英雄全球胜率"],
        function () {
            var games = dataGlobal.PlayerBase.PlaysWarrior.sum
            if (games <= 0)
                return false
            var wins = dataGlobal.PlayerBase.WinsWarrior.sum
            var WinRate = (wins / games * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "GlobalWinRateOfAssassin": [
        ["Global Assassins WinRate", "刺杀型英雄全球胜率"],
        function () {
            var games = dataGlobal.PlayerBase.PlaysAssassin.sum
            if (games <= 0)
                return false
            var wins = dataGlobal.PlayerBase.WinsAssassin.sum
            var WinRate = (wins / games * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "GlobalWinRateOfSupport": [
        ["Global Support WinRate", "治疗型英雄全球胜率"],
        function () {
            var games = dataGlobal.PlayerBase.PlaysSupport.sum
            if (games <= 0)
                return false
            var wins = dataGlobal.PlayerBase.WinsSupport.sum
            var WinRate = (wins / games * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
    "GlobalWinRateOfSpecialist": [
        ["Global Specialist WinRate", "专业型英雄全球胜率"],
        function () {
            var games = dataGlobal.PlayerBase.PlaysSpecialist.sum
            if (games <= 0)
                return false
            var wins = dataGlobal.PlayerBase.WinsSpecialist.sum
            var WinRate = (wins / games * 100).toFixed(2)
            return [
                WinRate + "%",
                WinRate + "%"
            ]
        }
    ],
}

var events = {
    "ZergKiller": [
        ["Zerg Killer", "虫群杀手"],
        function () {
            var avgDamage = Math.round(dataPersonal.PlayerBase.DamageDoneToZerg.sum / dataPersonal.PlayerBase.maps_total.sum[12])
            var limit = avgDamage > 5000
            return limit ?
                [
                    "You made " + avgDamage + " zerg damage on average in Braxis Holdout",
                    "平均每场布莱克西斯禁区中，你对虫群造成 " + avgDamage + " 点伤害"
                ] : false
        }
    ],
    "WinRate": [
        ["Amazing Win Rate", "令人惊讶的胜率"],
        function () {
            var myWinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
            var globalWinRate = (dataGlobal.PlayerBase.game_win.sum / dataGlobal.PlayerBase.game_total.sum * 100).toFixed(0)
            var limit = myWinRate > 1.2 * globalWinRate
            return limit ?
                [
                    "Your win rate (" + myWinRate + "%) is far higher than the global average (" + globalWinRate + "%) ",
                    "你的胜率 (" + myWinRate + "%) 远远高于全球平均水平 (" + globalWinRate + "%) "
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
            var limit = SupportRate > 0.5
            return limit ?
                [
                    "Among your " + gameTotal + " games you have played last week, you chose " + gameTotal + " times as Support heroes, that was " + SupportRate + " of your total games, with the " + SupportWinRate + " WinRate",
                    "上周你在 " + gameTotal + " 局里，玩了 " + Support + " 局辅助，占了总局数的 " + SupportRate + "%" + "，您辅助的胜率是 " + SupportWinRate
                ] : false
        }
    ],
    "DragonRider": [
        ["Dragon Rider", "龙骑士"],
        function () {
            var myDragon = (dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataPersonal.PlayerBase.maps_total.sum[7]).toFixed(2)
            var globalDragon = (dataGlobal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataGlobal.PlayerBase.maps_total.sum[7]).toFixed(2)
            var limit = myDragon > 2 * globalDragon
            var times = Math.round(myDragon / globalDragon)
            return limit ?
                [
                    "You are a real DragonRider with the " + times + " times more than the global average" + globalDragon + "times",
                    "你开龙的次数是全球平均水平的 " + times + " 倍呢！真是个名副其实的龙骑士！"
                ] : false
        }
    ],
    "Premades": [
        ["The King Of Premades", "开黑小能手"],
        function () {
            var rate_2 = (dataPersonal.PlayerBase.party_win_2.sum / dataPersonal.PlayerBase.party_win_2.sum * 100).toFixed(2)
            var rate_3 = (dataPersonal.PlayerBase.party_win_3.sum / dataPersonal.PlayerBase.party_win_3.sum * 100).toFixed(2)
            var rate_4 = (dataPersonal.PlayerBase.party_win_4.sum / dataPersonal.PlayerBase.party_win_4.sum * 100).toFixed(2)
            var rate_5 = (dataPersonal.PlayerBase.party_win_5.sum / dataPersonal.PlayerBase.party_win_5.sum * 100).toFixed(2)
            var limit = rate_2 > 0.5 && rate_3 > 0.5 && rate_4 > 0.5 && rate_5 > 0.5
            return limit ?
                [
                    "Your Win Rate of Premades were all beyond 50%, nice team work!",
                    "你和好友开黑的胜率都超过了50%，是个名副其实的开黑小能手呢"
                ] : false
        }
    ],
    "Miser": [
        ["Miser", "吝啬鬼"],
        function () {
            var Collected = dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
            var TurnedIn = dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
            var limit = TurnedIn < 0.6 * Collected
            return limit ?
                [
                    "On Black Heart Bay, you collected " + Collected + " Doubloons Coins " + ", but you only successfully turned in " + TurnedIn + ". You should look for more opportunities to turn in",
                    "黑心湾地图中，你收集了 " + Collected + " 个达布隆币" + ",但是你只成功上交了 " + TurnedIn + " 个达布隆币，你应该多寻找机会上交"
                ] : false
        }
    ],
    "UselessRavenTributes": [
        ["Useless Raven Tributes", "无用的乌鸦诅咒"],
        function () {
            var Collected = dataPersonal.PlayerBase.RavenTributesCollected.sum
            var Damage = dataPersonal.PlayerBase.CurseDamageDone.sum
            var Collected_gol = dataGlobal.PlayerBase.RavenTributesCollected.sum
            var Damage_gol = dataPersonal.PlayerBase.CurseDamageDone.sum
            var limit = Collected > 0.8 * Collected_gol && Damage < 0.5 * Damage_gol
            return limit ?
                [
                    "On Curse Valley, your curse damage was " + Damage + ", and the global average was " + Damage_gol + ". Use the curse time to get the maximum curse damage, such as pushing the line, pushing the tower, etc..",
                    "诅咒谷地图中，你的诅咒伤害是 " + Damage + " ,而全球平均水平是 " + Damage_gol + " 要善用诅咒时间来获取最大的诅咒伤害，比如跟推吃线、推塔等等。"
                ] : false
        }
    ],
    "PartyWinRate": [
        ["Good Bro", "好兄弟"],
        function () {
            var myPartyWinRate = (dataPersonal.PlayerBase.party_win.sum / dataPersonal.PlayerBase.party_total.sum * 100).toFixed(2)
            var globalPartyWinRate = (dataGlobal.PlayerBase.party_win.sum / dataGlobal.PlayerBase.party_total.sum * 100).toFixed(2)
            var limit = myPartyWinRate > 1.2 * globalPartyWinRate
            return limit ?
                [
                    "Your party win rate ( " + myPartyWinRate + "%) was far higher than the global average (" + globalPartyWinRate + "%) ",
                    "你与好友开黑的胜率 (" + myPartyWinRate + "%) 远远高于全球平均水平 (" + globalPartyWinRate + "%) "
                ] : false
        }
    ],
    "HeroDamage": [
        ["Massive Hero Damage", "大量英雄伤害"],
        function () {
            var myHeroDamage = Math.round(dataPersonal.PlayerBase.HeroDamage.sum)
            var globalHeroDamage = Math.round(dataGlobal.PlayerBase.HeroDamage.sum)
            var limit = myHeroDamage > 1.5 * globalHeroDamage
            return limit ?
                [
                    "Your HeroDamage (" + myHeroDamage + "%) is far higher than the global average (" + globalHeroDamage + "%) ",
                    "你英雄伤害 (" + myHeroDamage + "%) 远远高于全球平均水平( " + globalHeroDamage + "%) "
                ] : false
        }
    ],
    "TownKills": [
        ["Town Kills", "防御塔击杀"],
        function () {
            var data = dataPersonal.PlayerBase.TownKills.sum
            var limit = data > 5
            return limit ?
                [
                    "You are killed by Town for " + data + " times",
                    "您被防御塔击杀了 " + data + " 次",
                ] : false
        }
    ],
    "ControlMan": [
        ["Control Man", "掌控者"],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.TimeCCdEnemyHeroes.sum)
            var limit = data > 150
            return limit ?
                [
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
            var limit = result > 4 && WinRate > 50
            return limit ? [
                "You averaged " + times + " MrecCampCaputers per game. Good occupiedCamp habits have made your winning rate is " + WinRate + "%.",
                "这周你平均每场占领了 " + times + " 次雇佣兵，良好的开野习惯使你的胜率达到了 " + myWinRate + "%。",
            ] : false
        }
    ],
    "WaterInDesert": [
        ["Water In Desert", "雪中送炭"],
        function () {
            var times_per = (dataPersonal.PlayerBase.ClutchHealsPerformed.sum / dataPersonal.PlayerBase.PlaysSupport.sum).toFixed(2)
            var times_glo = (dataGlobal.PlayerBase.ClutchHealsPerformed.sum / dataGlobal.PlayerBase.PlaysSupport.sum).toFixed(2)
            var result = times_per / times_glo
            var limit = result > 1.2
            return limit ? [
                "You have " + times_per + " Clutch Heals per game in the assist games, and you are the most reliable partner in the team.",
                "你在辅助型局中，平均每场有 " + times_per + " 次关键治疗，是团队中最可靠的伙伴。",
            ] : false
        }
    ],
    "ServentOfSpiderQueen": [
        ["Servent Of Spider Queen", "蛛后的仆人"],
        function () {
            var TurnedIn = (dataPersonal.PlayerBase.GemsTurnedIn.sum / dataPersonal.PlayerBase.maps_total.sum[5]).toFixed(0)
            var limit = TurnedIn > 40
            return limit ? [
                "On Tomb Of The Spider Queen, you Turned In " + TurnedIn + " per game, you are the very loyal servant of The sipder queen.",
                "蛛后墓地图中，你平均每场上交了 " + TurnedIn + " 宝石，蛛后的忠心的仆从就是你啦。",
            ] : false
        }
    ],
    "TheLoverHero": [
        ["The Hero", "本命英雄"],
        function () {
            var item = dataPersonal.PlayerHeroes._sumMax.game_total
            var heroID = item[0]
            var times = item[1]
            var WinRate = (dataPersonal.PlayerHeroes[heroID].game_win.sum / dataPersonal.PlayerHeroes[heroID].game_total.sum * 100).toFixed(2)
            var limit = WinRate > 50
            return limit ? [
                "You played Hero " + heroID + " for" + times + "times, with " + WinRate + "% winning rate.",
                "你使用了英雄 " + heroID + " 上场了 " + times + "次，胜率达到了" + WinRate + "%。",
            ] : false
        }
    ],
    "MyLifeforaier": [
        ["My Life For Aier", "为了艾尔"],
        function () {
            if (dataPersonal.PlayerHeroes[1] === undefined || dataPersonal.PlayerHeroes[6] === undefined || dataPersonal.PlayerHeroes[43] === undefined ||
                dataPersonal.PlayerHeroes[56] === undefined || dataPersonal.PlayerHeroes[64] === undefined || dataPersonal.PlayerHeroes[78] === undefined)
                return false
            var Zeratul = dataPersonal.PlayerHeroes[1].game_total.sum > 5
            var Tassadar = dataPersonal.PlayerHeroes[6].game_total.sum > 2
            var Artanis = dataPersonal.PlayerHeroes[43].game_total.sum > 5
            var Alarak = dataPersonal.PlayerHeroes[56].game_total.sum > 5
            var Probius = dataPersonal.PlayerHeroes[64].game_total.sum > 2
            var Fenix = dataPersonal.PlayerHeroes[78].game_total.sum > 5
            var limit = Zeratul && Tassadar && Artanis && Alarak && Probius && Fenix
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
            var Kerrigan = dataPersonal.PlayerHeroes[15].game_total.sum > 5
            var Abathur = dataPersonal.PlayerHeroes[22].game_total.sum > 5
            var Zagara = dataPersonal.PlayerHeroes[27].game_total.sum > 3
            var Dehaka = dataPersonal.PlayerHeroes[50].game_total.sum > 5
            var Stukov = dataPersonal.PlayerHeroes[69].game_total.sum > 3
            var limit = Kerrigan && Abathur && Zagara && Dehaka && Stukov
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
            var SgtHammer = dataPersonal.PlayerHeroes[9].game_total.sum > 5
            var Raynor = dataPersonal.PlayerHeroes[10].game_total.sum > 5
            var Nova = dataPersonal.PlayerHeroes[11].game_total.sum > 3
            var Tychus = dataPersonal.PlayerHeroes[23].game_total.sum > 5
            var LtMorales = dataPersonal.PlayerHeroes[42].game_total.sum > 3
            var Blaze = dataPersonal.PlayerHeroes[76].game_total.sum > 5
            var limit = SgtHammer && Raynor && Nova && Tychus && LtMorales && Blaze
            return limit ? [
                "SCV is ready！ SgtHammer,Raynor,Nova,Tychus,LtMorales,Blaze and other Terran heroes have been called many times!",
                "SCV就绪！重锤军士、雷诺、诺娃、泰凯斯、莫拉莉斯中尉、布雷泽等人族英雄多次被你征召！",
            ] : false
        }
    ],
    "DeepDarkFantasy": [
        ["Deep ♂ Dark ♂ Fantasy", "Deep ♂ Dark ♂ Fantasy"],
        function () {
            if (dataPersonal.PlayerHeroes[20] === undefined || dataPersonal.PlayerHeroes[23] === undefined || dataPersonal.PlayerHeroes[70] === undefined)
                return false
            var Diablo = dataPersonal.PlayerHeroes[20].game_total.sum > 5 && ((dataPersonal.PlayerHeroes[20].game_total.sum / dataPersonal.PlayerHeroes[20].game_total.sum) > 0.5)
            var Tychus = dataPersonal.PlayerHeroes[23].game_total.sum > 5 && ((dataPersonal.PlayerHeroes[23].game_total.sum / dataPersonal.PlayerHeroes[23].game_total.sum) > 0.5)
            var Garrosh = dataPersonal.PlayerHeroes[70].game_total.sum > 5 && ((dataPersonal.PlayerHeroes[70].game_total.sum / dataPersonal.PlayerHeroes[70].game_total.sum) > 0.5)
            var limit = Diablo && Tychus && Garrosh
            return limit ? [
                "Boy ♂ Next ♂ Door！ Diablo, Tychus, Garrosh have been called many times! And their winning rate are all beyond 50%.",
                "Boy ♂ Next ♂ Door！迪亚波罗、泰凯斯、加尔鲁什多次被你征召！并且胜率都超过了 50%。",
            ] : false
        }
    ],

    "Uther": [
        ["Silver Hand", "白银之手"],//乌瑟尔
        function () {
            if (dataPersonal.PlayerHeroes[3] === undefined || dataPersonal.PlayerHeroes[3].game_total.sum < 10)
                return false
            var Games = dataPersonal.PlayerHeroes[3].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[3].game_total.sum / dataPersonal.PlayerHeroes[3].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[3].game_win.sum / dataGlobal.PlayerHeroes[3].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate >= 55
                return limit ? [
                    "We are St. Cleveland! You have played Uther for " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Uther's global winning rate: " + GlobalWinRate + "%. The emotional revenge must not be allowed to occupy our consciousness.",
                    "我们是圣骑士！本周你使用乌瑟尔完成了 " + Games + " 场游戏，胜率达到了 " + WinRate + "%，乌瑟尔全球胜率：" + GlobalWinRate + "%。不要让仇恨蒙蔽了我们的双眼！"
                ] : false
            }
            else
                return false
        }
    ],
    "Illidan": [
        ["You Are Not Prepared", "千送伊"],//伊利丹
        function () {
            if (dataPersonal.PlayerHeroes[16] === undefined || dataPersonal.PlayerHeroes[16].game_total.sum < 10)
                return false
            var Games = dataPersonal.PlayerHeroes[16].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[16].game_win.sum / dataPersonal.PlayerHeroes[16].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[16].game_win.sum / dataGlobal.PlayerHeroes[16].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate > 50
                return limit ? [
                    "You are not prepared! You have played Illidan for " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Illidan's global winning rate: " + GlobalWinRate + "%. At sometimes , the hand of fate must be forced.",
                    "你们这是自寻死路！本周你使用伊利丹进行了 " + Games + "场游戏，胜率达到了 " + WinRate + "%，伊利丹全球胜率：" + GlobalWinRate + "%。有时候，命运之手必须掌握在自己手中。"
                ] : false
            }
            else {
                var limit = Games >= 10 && WinRate <= 50
                return limit ? [
                    "Feeling the...! And you have neither! You have played Illidan for " + Games + " times, your winning rate is only " + WinRate + "%, Illidan's global winning rate is " + GlobalWinRate + "%. His hatred is unending!",
                    "感受辶...英雄阵亡！本周你使用伊利丹进行了 " + Games + "场游戏，胜率竟然才 " + WinRate + "%，伊利丹全球胜率：" + GlobalWinRate + "%。他心中的怒火无法平息无法平息！"
                ] : false
            }

        }
    ],
    "Gazlowe": [
        ["Shelf Reed", "架子芦苇"],//加兹鲁维
        function () {
            if (dataPersonal.PlayerHeroes[17] === undefined || dataPersonal.PlayerHeroes[17].game_total.sum < 10)
                return false
            var Games = dataPersonal.PlayerHeroes[17].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[17].game_win.sum / dataPersonal.PlayerHeroes[17].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[17].game_win.sum / dataGlobal.PlayerHeroes[17].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate >= 55
                return limit ? [
                    "Time is money, friend. And you own them both! You have played Gazlowe for " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Gazlowe's global winning rate: " + GlobalWinRate + "%. Does this turn you on?",
                    "时间就是金钱我的朋友，你全都要！本周你使用加兹鲁维完成了 " + Games + " 场游戏，胜率达到了 " + WinRate + "%，加兹鲁维全球胜率：" + GlobalWinRate + "%。这让你兴奋起来了么？"
                ] : false
            }
            else {
                var limit = Games >= 10 && WinRate < 40
                return limit ? [
                    "Time is money, friend! And you have neither! You have played Gazlowe for " + Games + " times, your winning rate is only " + WinRate + "%, Gazlowe's global winning rate is " + GlobalWinRate + "%. Out of the way you nubgoblin. (Gazlowe's armor said)",
                    "时间就是金钱我的朋友，而你两样都没有！本周你使用加兹鲁维完成了 " + Games + "场游戏，胜率才 " + WinRate + "%，加兹鲁维全球胜率：" + GlobalWinRate + "%。你这地精还不如客厅克星！"
                ] : false
            }

        }
    ],
    "EvolutionComplete": [
        ["Evolution Complete!", "进化完成"],
        function () {
            if (dataPersonal.PlayerHeroes[22] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[22].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[22].game_win.sum / dataPersonal.PlayerHeroes[22].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[22].game_win.sum / dataGlobal.PlayerHeroes[22].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate >= 50
                return limit ? [
                    "Evolution Complete! Abathur appeared in the " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Abathur's global winning rate: " + GlobalWinRate + "%, good play! ",
                    "进化成功！阿巴瑟登场了 " + Games + " 次，胜率达到了 " + WinRate + "%，阿巴瑟全球胜率：" + GlobalWinRate + "%，玩的不错！",
                ] : false
            }
            else return false
        }
    ],
    "MurkyKing": [
        ["Grglrgl！Lrgl grgrmrmlgr!", "Grglrgl！Lrgl grgrmrmlgr!"],
        function () {
            if (dataPersonal.PlayerHeroes[26] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[26].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[26].game_win.sum / dataPersonal.PlayerHeroes[26].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[26].game_win.sum / dataGlobal.PlayerHeroes[26].game_total.sum * 100).toFixed(2)
            if (Wins > GlobalWinRate) {
                var limit = Games >= 10 && WinRate > 55
                return limit ? [
                    "Wrlgmmglglgm! You have played Murky " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Murky's global winning rate: " + GlobalWinRate + "%. Rmlg! Grlmmrlm!",
                    "Wrlgmmglglgm！你玩了 " + Games + " 局小鱼人，胜率达到了 " + WinRate + "%，小鱼人的全球胜率是 " + GlobalWinRate + "%。Rmlg！Grlmmrlm！",
                ] : false
            }
            else return false
        }
    ],
    "Lunara": [
        ["hahahahaha", "哈哈哈哈哈"],//露娜拉
        function () {
            if (dataPersonal.PlayerHeroes[46] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[46].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[46].game_win.sum / dataPersonal.PlayerHeroes[46].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[46].game_win.sum / dataGlobal.PlayerHeroes[46].game_total.sum * 100).toFixed(2)
            var limit = Games >= 10 && WinRate >= 60
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate >= 60
                return limit ? [
                    " Hahahahaha! Hahahahaha! You have played Lunara " + Games + " times , your winning rate is up to " + WinRate + "%, which higher than Lunara's global winning rate: " + GlobalWinRate + "%. The forest doesn't need protection, but you do (^_^)v ",
                    " 哈哈哈哈哈，哈哈哈哈哈！本周你使用露娜拉进行了 " + Games + " 场游戏，胜率达到了 " + WinRate + "%，露娜拉全球胜率：" + GlobalWinRate + "%。森林不需要保护，但你需要(^_^)v "
                ] : false
            }
            else return false
        }
    ],
    "TheLastGuardian": [
        ["The Last Guardian", "最后的守护者"],//麦迪文
        function () {
            if (dataPersonal.PlayerHeroes[53] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[53].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[53].game_win.sum / dataPersonal.PlayerHeroes[53].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[53].game_win.sum / dataGlobal.PlayerHeroes[53].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate >= 55
                return limit ? [
                    "You have played Medivh " + Games + " times , your winning rate is up to " + WinRate + "%, which higher than Lunara's global winning rate: " + GlobalWinRate + "%. What can I say? Coooooooool play!",
                    "本周你使用麦迪文进行了 " + Games + " 场游戏，胜率高达 " + WinRate + "%, 麦迪文全球胜率：" + GlobalWinRate + "%，我还能说什么，麦迪斌玩的不错！"
                ] : false
            }
            else {
                var limit = Games >= 10 && WinRate <= 40
                return limit ? [
                    "That's stupid, I foresee the future, seeing the burning shadows that are about to swallow the world, You have used Medivh to have " + Games + " games, your winning rate is only " + WinRate + "%, Medivh's global winning rate is " + GlobalWinRate + "%.",
                    "那可真蠢，我预见到了未来，看到了即将吞噬这个世界的燃烧著的阴影。本周你使用麦迪文进行了 " + Games + " 场游戏，胜率才 " + WinRate + "%, 麦迪文全球胜率：" + GlobalWinRate + "%。下一位忠奸人就是你了！"
                ] : false
            }
        }
    ],
    "Krisolthokaran": [
        ["Krisol thok aran!", "骚骚可浪"],
        function () {
            if (dataPersonal.PlayerHeroes[56] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[56].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[56].game_win.sum / dataPersonal.PlayerHeroes[56].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[56].game_win.sum / dataGlobal.PlayerHeroes[56].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit2 = Games > 7 && WinRate > 50
                return limit2 ? [
                    "General Performance, I personally appeared " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Lunara's global winning rate: " + GlobalWinRate + "%, next time I will consider helping you again. ",
                    "表现还行，我亲自登场了 " + Games + " 次，胜率达到了 " + WinRate + "%，全球的高阶领主平均胜率是 " + GlobalWinRate + "%，下次我会考虑再帮你的。",
                ] : false
            }
            else {
                var limit1 = Games > 7 && WinRate <= 50
                return limit1 ? [
                    "Such a shame, I personally appeared " + Games + " times, your winning rate is only " + WinRate + "%, Alarak's global winning rate is " + GlobalWinRate + "%, Plz do not pick me again! ",
                    "真是丢人现眼，我亲自登场了 " + Games + " 次，胜率才 " + WinRate + "%，全球的高阶领主平均胜率都有 " + GlobalWinRate + "%，不要再让我登场了！",
                ] : false
            }
        }
    ],
    "TheFirelord": [
        ["The Firelord", "炎魔之王"],//螺丝
        function () {
            if (dataPersonal.PlayerHeroes[60] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[60].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[60].game_win.sum / dataPersonal.PlayerHeroes[60].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[60].game_win.sum / dataGlobal.PlayerHeroes[60].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit1 = Games >= 10 && WinRate >= 55
                return limit1 ? [
                    "By fire be PURGED! You've played Ragnaros " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Lunara's global winning rate: " + GlobalWinRate + "%. Burn those bugs with fire!",
                    "让火焰净化一切！本周你使用拉格纳罗斯进行了 " + Games + " 场游戏，胜率高达 " + WinRate + "%, 拉格纳罗斯全球胜率：" + GlobalWinRate + "%，用火焰把那些虫子燃烧殆尽！"
                ] : false
            }
            else {
                var limit1 = Games >= 10 && WinRate <= 45
                return limit1 ? [
                    "DIE, INSECT! You have used Ragnaros to have " + Games + " games, your winning rate is only " + WinRate + "%, Ragnaros' global winning rate is " + GlobalWinRate + "%. Calculating the timing of the pit, sometimes it is a good choice to use D in the enemy's back.",
                    "死吧，虫子！本周你使用拉格纳罗斯进行了 " + Games + " 场游戏，胜率只有 " + WinRate + "%, 拉格纳罗斯全球胜率：" + GlobalWinRate + "%。掌握上坑的时机，有时候绕后上坑也是一个不错的选择."
                ] : false
            }
        }
    ],
    "Genji": [
        ["Happy Darter", "快乐镖男"],//源氏
        function () {
            if (dataPersonal.PlayerHeroes[66] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[66].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[66].game_win.sum / dataPersonal.PlayerHeroes[66].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[66].game_win.sum / dataGlobal.PlayerHeroes[66].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate > 58
                return limit ? [
                    "Play to win! You have played Genji " + Games + " times , your winning rate is up to " + WinRate + "%, which higher than Genji's global winning rate: " + GlobalWinRate + "%. You are a qualified Happy Darter.",
                    "玩游戏就是要赢！本周你使用源氏进行了 " + Games + " 场游戏，胜率竟然达到了 " + WinRate + "%, 源氏全球胜率：" + GlobalWinRate + "%。你是一位合格的快乐镖男！"
                ] : false
            }
            else {
                var limit = Games >= 10 && WinRate < 42
                return limit ? [
                    "Poor insect! You have used Genji to have " + Games + " games, I can't believe your winning rate is only " + WinRate + "%, Genji's global winning rate is " + GlobalWinRate + "%. You need healing.",
                    "卑微的苍蝇！本周你使用源氏进行了 " + Games + " 场游戏，胜率竟然才 " + WinRate + "%, 源氏全球胜率：" + GlobalWinRate + "%。哼，啊嚯噶！"
                ] : false
            }
        }
    ],
    "Alexstrasza": [
        ["Life-Binder", "生命缚誓者"],//阿莱克丝塔萨
        function () {
            if (dataPersonal.PlayerHeroes[74] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[74].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[74].game_win.sum / dataPersonal.PlayerHeroes[74].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[74].game_win.sum / dataGlobal.PlayerHeroes[74].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate >= 50
                return limit ? [
                    "New life blooms! You have played Alexstrasza " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Alexstrasza's global winning rate: " + GlobalWinRate + "%. You bring life and hope!",
                    "新的生命将在烈焰中绽放！本周你使用阿莱克丝塔萨进行了 " + Games + " 场游戏，胜率竟然达到了 " + WinRate + "%，阿莱克丝塔萨全球胜率：" + GlobalWinRate + "%。你带来了生命和希望！"
                ] : false
            }
            else {
                var limit = Games >= 10 && WinRate < 50
                return limit ? [
                    "Take heart, heroes, life will always blossom from the darkest soil! You have played Alexstrasza " + Games + " times, your winning rate is only " + WinRate + "%, Alexstrasza's global winning rate is " + GlobalWinRate + "%. Life is good, life is beautiful, life is even strange. What it certainly is not, however, is a highway. Do not lose hope.",
                    "振作起来，英雄们，生命总会在最黑暗的地方绽放！本周你使用阿莱克丝塔萨完成了 " + Games + " 场游戏，胜率只有 " + WinRate + "%，阿莱克丝塔萨全球胜率：" + GlobalWinRate + "%。生命很美好，生命很美丽，生命甚至有各种机缘，但再怎么样，生命也不会一帆风顺的，别失去希望。"
                ] : false
            }
        }
    ],
    "Warden": [
        ["Where is Illidan?", "伊利丹在哪？"],//玛维
        function () {
            if (dataPersonal.PlayerHeroes[77] === undefined)
                return false
            var Games = dataPersonal.PlayerHeroes[77].game_total.sum
            var WinRate = (dataPersonal.PlayerHeroes[77].game_win.sum / dataPersonal.PlayerHeroes[77].game_total.sum * 100).toFixed(2)
            var GlobalWinRate = (dataGlobal.PlayerHeroes[77].game_win.sum / dataGlobal.PlayerHeroes[77].game_total.sum * 100).toFixed(2)
            if (WinRate > GlobalWinRate) {
                var limit = Games >= 10 && WinRate >= 55
                return limit ? [
                    "You are Maiev Master! You have played Maiev " + Games + " times, your winning rate is up to " + WinRate + "%, which higher than Lunara's global winning rate: " + GlobalWinRate + "%. You are a qualified Happy Darter.",
                    "玛维的取胜技巧已被你掌握，本周你使用玛维进行了 " + Games + " 场游戏，胜率高达 " + WinRate + "%, 玛维全球胜率：" + GlobalWinRate + "%。"
                ] : false
            }
            else {
                var limit = Games >= 10 && WinRate < 45
                return limit ? [
                    "The hunter is nothing without the hunted. You have played Maiev " + Games + " games, your winning rate is only " + WinRate + "%, Maiev's global winning rate is " + GlobalWinRate + "%.The key is master the time of her abilities E and D,and the accuracy of her Q.",
                    "一个猎手失去了猎物就会一无所有。本周你使用玛维进行了 " + Games + " 场游戏，胜率竟然才 " + WinRate + "%, 玛维全球胜率：" + GlobalWinRate + "%。用好玛维的 E 和 D ，并且提高 Q 的精确度，能提高不少胜率！"
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
    "Sylvanas": [//希尔瓦纳斯 id:35 诅咒之下，欢乐何在
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
            var Uther = dataPersonal.PlayerHeroes[3].game_total.sum > 3
            var Tyrande = dataPersonal.PlayerHeroes[4].game_total.sum > 3
            var Muradin = dataPersonal.PlayerHeroes[13].game_total.sum > 3
            var Falstad = dataPersonal.PlayerHeroes[18].game_total.sum > 3
            var Jaina = dataPersonal.PlayerHeroes[32].game_total.sum > 3
            var Kaelthas = dataPersonal.PlayerHeroes[36].game_total.sum > 3
            var Greymane = dataPersonal.PlayerHeroes[47].game_total.sum > 3
            var Medivh = dataPersonal.PlayerHeroes[53].game_total.sum > 3
            var Varian = dataPersonal.PlayerHeroes[59].game_total.sum > 3
            var Yrel = dataPersonal.PlayerHeroes[80].game_total.sum > 3
            var limit = Uther && Tyrande && Muradin && Falstad && Jaina && Kaelthas && Greymane && Medivh && Varian && Yrel
            return limit ? [
                "For the Alliance！ Alliance heroes have been called many times!",
                "为了联盟！ 联盟将士们多次被你征召",
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
            var ETC = dataPersonal.PlayerHeroes[19].game_total.sum > 3
            var Rehgar = dataPersonal.PlayerHeroes[28].game_total.sum > 3
            var Thrall = dataPersonal.PlayerHeroes[33].game_total.sum > 3
            var Sylvanas = dataPersonal.PlayerHeroes[35].game_total.sum > 3
            var Rexxar = dataPersonal.PlayerHeroes[41].game_total.sum > 3
            var Guldan = dataPersonal.PlayerHeroes[54].game_total.sum > 3
            var Samuro = dataPersonal.PlayerHeroes[58].game_total.sum > 3
            var Zuljin = dataPersonal.PlayerHeroes[61].game_total.sum > 3
            var Garrosh = dataPersonal.PlayerHeroes[70].game_total.sum > 3
            var limit = ETC && Rehgar && Thrall && Sylvanas && Rexxar && Guldan && Samuro && Zuljin && Garrosh
            return limit ? [
                "Lok'tar ogar！ Horde heroes have been called many times!",
                "Lok'tar ogar！部落战士们多次被你征召！",
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
        ["Boyfriends Of Jaina", "吉安娜的男友们"],//阿尔萨斯，萨尔，凯尔萨斯
        function () {
            if (dataPersonal.PlayerHeroes[21] === undefined || dataPersonal.PlayerHeroes[33] === undefined ||
                dataPersonal.PlayerHeroes[36] === undefined)
                return false
            var Arthas = dataPersonal.PlayerHeroes[21].game_total.sum > 2
            var Thrall = dataPersonal.PlayerHeroes[33].game_total.sum > 2
            var Kaelthas = dataPersonal.PlayerHeroes[36].game_total.sum > 2
            var tot = (dataPersonal.PlayerHeroes[21].game_total.sum + dataPersonal.PlayerHeroes[33].game_total.sum + dataPersonal.PlayerHeroes[36].game_total.sum) > 15
            var limit = Arthas && Thrall && Kaelthas && tot
            return limit ? [
                "You've played a lot Boyfriends of Jaina, cheer up warriors, sooner, Jaina shall be yours!",
                "这周你玩了许多局吉安娜的男友们，加油勇士，吉安娜就快是你的了！",
            ] : false
        }
    ],
    "DiabloVillains": [
        ["Diablo Villains", "暗黑恶棍"],//李奥瑞克，屠夫，迪亚波罗
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
        ["Loving And Hurting", "相爱相杀"],//玛维，伊利丹
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
        ["For The Love", "因为爱情"],//泰兰德，伊利丹
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
    "NightElfBetrayer ": [
        ["Night Elf Betrayer ", "暗夜精灵背叛者"],//伊利丹，玛法里奥
        function () {
            if (dataPersonal.PlayerHeroes[16] === undefined || dataPersonal.PlayerHeroes[14] === undefined)
                return false
            var Illidan = dataPersonal.PlayerHeroes[16].game_total.sum > 5
            var Malfurion = dataPersonal.PlayerHeroes[14].game_total.sum > 5
            var limit = Illidan && Malfurion
            return limit ? [
                "So be it, brother. Illidan and Malfurion have taken a lot tasks for you together in the combat. Hope to end from this day forward, let there be peace between them.",
                "那就这样吧，兄弟。这周玛法里奥和伊利丹共同承担了你的多场战斗任务。希望从今以后他们之间能够保持和平。",
            ] : false
        }
    ],
    "HappyFamily": [
        ["Happy Family", "相亲相爱一家人"],//玛法里奥，泰兰德，伊利丹
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
        ["Stormstout", "风暴烈酒"],//陈，丽丽
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
        ["Undercity", "幽暗城"],//希尔瓦娜斯，缝合怪
        function () {
            if (dataPersonal.PlayerHeroes[7] === undefined || dataPersonal.PlayerHeroes[35] === undefined)
                return false
            var Stitches = dataPersonal.PlayerHeroes[3].game_total.sum > 5
            var Sylvanas = dataPersonal.PlayerHeroes[35].game_total.sum > 5
            var limit = Stitches && Sylvanas
            return limit ? [
                "Undercity Collection! Sylvanas have been called " + Sylvanas + " times, And Stitches " + Stitches + " times",
                "幽暗城通关！ 希尔瓦娜斯被征召了 " + Sylvanas + " 次，缝合怪被征召了 " + Stitches + " 次",
            ] : false
        }
    ],
    "StarCraftRebels": [
        ["StarCraft Rebels", "星际叛军"],//雷诺，凯瑞甘，泰凯斯
        function () {
            if (dataPersonal.PlayerHeroes[10] === undefined || dataPersonal.PlayerHeroes[15] === undefined || dataPersonal.PlayerHeroes[23] === undefined)
                return false
            var Raynor = dataPersonal.PlayerHeroes[10].game_total.sum > 5
            var Kerrigan = dataPersonal.PlayerHeroes[15].game_total.sum > 5
            var Tychus = dataPersonal.PlayerHeroes[23].game_total.sum > 5
            var limit = Raynor && Kerrigan && Tychus
            return limit ? [
                "Triangle Relation! Reynor have been called " + Reynor + " times,  Tychus " + Tychus + " times,and Kerrigan " + Kerrigan + " times",
                "三角关系！ 雷诺被征召了 " + Reynor + " 次，泰凯斯被征召了 " + Tychus + " 次，凯瑞甘被征召了 " + Kerrigan + " times",
            ] : false
        }
    ],
    "AngirisCouncil": [
        ["Angiris Council", "天使议会"],//泰瑞尔，奥莉尔，马萨伊尔
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
        ["United Protoss", "统一星灵"],//泽拉图，塔萨达，阿塔尼斯
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
        ["Double Trouble", "双重麻烦"],//古，加尔
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
        ["Reign of Chaos", "混乱之治"],//乌瑟尔，阿尔萨斯，吉安娜，萨尔
        function () {
            if (dataPersonal.PlayerHeroes[3] === undefined || dataPersonal.PlayerHeroes[21] === undefined || dataPersonal.PlayerHeroes[32] === undefined
                || dataPersonal.PlayerHeroes[33] === undefined)
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
    "AlarakAngle": [
        ["Alarak Angle", "阿拉纳克的愤怒"],//阿拉纳克
        function () {
            var Assassingames = dataPersonal.PlayerBase.PlaysAssassin.sum
            if (Assassingames < 30)
                return false
            var Alarakgames = dataPersonal.PlayerHeroes[56].game_total.sum
            var limit = Alarakgames < 5
            return limit ? [
                "Humph! Humble servant! ! You played " + Assassingames + " Assassin Heros, I only appeared poor " + Alarakgames + " times, it is really embarrassing! ",
                "哼！卑微的死徒！！你玩了 " + Assassingames + " 次刺杀型英雄，我才登场了可怜的 " + Alarakgames + " 次，真是令人难堪！",
            ] : false
        }
    ],
    "ShimadaClan": [
        ["Shimada Clan", "岛田家族"],//源氏，半藏
        function () {
            if (dataPersonal.PlayerHeroes[66] === undefined || dataPersonal.PlayerHeroes[75] === undefined)
                return false
            var Genji = dataPersonal.PlayerHeroes[66].game_total.sum > 5
            var Hanzo = dataPersonal.PlayerHeroes[75].game_total.sum > 5
            var GenjiWinRate = (dataPersonal.PlayerHeroes[66].game_win.sum / dataPersonal.PlayerHeroes[66].game_total.sum * 100).toFixed(2)
            var HanzoWinRate = (dataPersonal.PlayerHeroes[75].game_win.sum / dataPersonal.PlayerHeroes[75].game_total.sum * 100).toFixed(2)
            var limit = Genji && Hanzo && GenjiWinRate > 50 && HanzoWinRate > 50
            return limit ? [
                "The Unity Of The Dragon And The Man!  Genji have been called " + Genji + " times,with the " + GenjiWinRate + "% WinRate,Hanzo have been called " + Hanzo + " times,with the " + HanzoWinRate + "% WinRate",
                "人龙合一！ 源氏被征召了 " + Genji + " 次，有着 " + GenjiWinRate + "%胜率。半藏被征召了 " + Hanzo + " 次，有着 " + HanzoWinRate + "%胜率。",
            ] : false
        }
    ],
    "FantasticFour": [
        ["Fantastic Four", "神奇四侠"],//源氏，半藏，猎空，狂鼠
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
                "狂鼠被征召了 " + Junkrat + " 次，有着 " + JunkratWinRate + "%胜率。半藏被征召了 " + Hanzo + " 次，有着 " + HanzoWinRate + "%胜率。",
            ] : false
        }
    ],
    "InTheShadow": [
        ["InTheShadow", "来自阴影"],//泽拉图，诺娃，萨穆罗，瓦莉拉
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
    ],
    "MeatMeatMeat": [
        ["Meat!Meat!Meat!", "肉！肉！肉！"],//屠夫
        function () {
            if (dataPersonal.PlayerHeroes[38] === undefined || dataPersonal.PlayerHeroes[38].game_total.sum < 5)
                return false
            var ButcherWinRate = (dataPersonal.PlayerHeroes[38].game_win.sum / dataPersonal.PlayerHeroes[38].game_total.sum * 100).toFixed(2)
            var ButcherGlobalWinRate = (dataPersonal.PlayerHeroes[38].game_win.sum / dataPersonal.PlayerHeroes[38].game_total.sum * 100).toFixed(2)
            if (ButcherWinRate < 50 || ButcherWinRate < ButcherGlobalWinRate) {
                return [
                    "Your Butcher's WinRate is " + ButcherWinRate + "%, and the global Butcher's winning rate is " + ButcherGlobalWinRate + "%. Mastering the right way to eat meat is the only way for  Butcher to win. PS: At the  beginning of game Butcher should try to eat XP or Gank.",
                    "你的屠夫的胜率是 " + ButcherWinRate + "%,而全球屠夫平均胜率是 " + ButcherGlobalWinRate + "%,掌握正确的吃肉方法才是屠夫的取胜之道。PS:前期屠夫可以尝试多吃线攒肉游走抓单。",
                ]
            }
            if (ButcherWinRate >= 50 && ButcherWinRate >= ButcherGlobalWinRate) {
                return [
                    "There is no doubt that you have mastered the skills of using the Butcher's Slayer. Your Butcher's winning percentage is " + ButcherWinRate + "%, while the global Butcher's winning rate is " + ButcherGlobalWinRate + "%",
                    "毫无疑问，你掌握了如何使用屠龙刀的技巧，你的屠夫的胜率是 " + ButcherWinRate + "%,而全球屠夫平均胜率是 " + ButcherGlobalWinRate + "%",
                ]
            }
            else {
                return false
            }
        }
    ],
}



// Todo: 排行榜，等待接口支持
var ranking = {}
