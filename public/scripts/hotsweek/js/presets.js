
//将Level_count等字段中的对象转为数组
var object_to_array = function (object) {
    var arr = [];
    for (var i in Object.keys(object)) {
        arr.push(Object.keys(object)[i]);
    }
    return arr;
}

var timestamptotime = function (unix_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;
}

//依次为被除数，除数，精确度，是否为百分比，错误信息，单位。其中单位是一个长度为2的数组，形如["times","次"]；percentage_flag为1时表示计算结果为百分比
var counter = {
    'WeekLength': [
        ['Length', '周时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'WeekTimes': [
        ['Times', '周场次'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_total.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    'WeekWin': [
        ['Win', '周胜场'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_win.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    'WeekMostUsed': [
        ['Most Used Heroes', '使用最多的英雄'],
        function () {
            var item = dataPersonal.PlayerHeroes._sumMax.game_total
            var heroID = item[0]
            var times = item[1]
            return [
                'Hero ' + heroID + ' was used ' + times + ' times',
                '英雄 ' + heroID + ' 被使用了 ' + times + ' 次'
            ]
        }
    ],
    //  add by Solaria
    //0-3
    'WeekQuickMatch_length': [
        ['Quick Match Length', '快速模式时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_QuickMatch.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_QuickMatch_avg_length': [
        ['Quick Match Avg Length', '快速模式平均时长'],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_QuickMatch.sum
            var count = dataPersonal.PlayerBase.game_total_QuickMatch.sum
            return count > 0 ? [
                ((sum / 60) / count).toFixed(0) + " minutes",
                ((sum / 60) / count).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
    //0-4
    'week_HeroLeague_length': [
        ['Hero League Length', '英雄联赛时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_HeroLeague.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_HeroLeague_avg_length': [
        ['Hero League Avg Length', '英雄联赛平均时长'],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_HeroLeague.sum / 60
            var count = dataPersonal.PlayerBase.game_total_HeroLeague.sum
            return count > 0 ? [
                (sum / count).toFixed(0) + " minutes",
                (sum / count).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
    //0-5
    'week_TeamLeague_length': [
        ['Team League Length', '团队联赛时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_TeamLeague.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_TeamLeague_avg_length': [
        ['Team League Avg Length', '团队联赛平均时长'],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_TeamLeague.sum
            var count = dataPersonal.PlayerBase.game_total_TeamLeague.sum
            return count > 0 ? [
                (sum / count / 60).toFixed(0) + " minutes",
                (sum / count / 60).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
    //0-6
    'week_UnrankedDraft_length': [
        ['Unranked Draft Length', '非排名模式时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_UnrankedDraft.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_UnrankedDraft_avg_length': [
        ['Unranked Draft Avg Length', '非排名模式平均时长'],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_UnrankedDraft.sum
            var count = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
            return count > 0 ? [
                (sum / count / 60).toFixed(0) + " minutes",
                (sum / count / 60).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
    //0-7
    'WeekQuickMatch_total': [
        ['Quick Match Played', '快速模式总场次'],
        function () {
            var data = dataPersonal.PlayerBase.game_total_QuickMatch.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-8
    'WeekHeroLeague_total': [
        ['Hero League Played', '英雄联赛总场次'],
        function () {
            var data = dataPersonal.PlayerBase.game_total_HeroLeague.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-9
    'WeekTeamLeague_total': [
        ['Team League Played', '团队联赛总场次'],
        function () {
            var data = dataPersonal.PlayerBase.game_total_TeamLeague.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-10
    'WeekUnrankedDraft_total': [
        ['Unranked Draft Played', '非排名模式总场次'],
        function () {
            var data = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-11
    'WeekQuickMatch_win': [
        ['Quick Match Wins', '快速模式胜场'],
        function () {
            var data = dataPersonal.PlayerBase.game_win_QuickMatch.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-12
    'WeekHeroLeague_win': [
        ['Hero League Wins', '英雄联赛胜场'],
        function () {
            var data = dataPersonal.PlayerBase.game_win_HeroLeague.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-13
    'WeekTeamLeague_win': [
        ['Team League Wins', '团队联赛胜场'],
        function () {
            var data = dataPersonal.PlayerBase.game_win_TeamLeague.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-14
    'WeekUnrankedDraft_win': [
        ['Unranked Draft Wins', '非排名模式胜场'],
        function () {
            var data = dataPersonal.PlayerBase.game_win_UnrankedDraft.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-winrate
    'WeekQuickMatch_win_rate': [
        ['QuickMatch win rate', '快速模式胜率'],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_QuickMatch.sum
            var count = dataPersonal.PlayerBase.game_total_QuickMatch.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    'WeekHeroLeague_win_rate': [
        ['Hero League Wins Rate', '英雄联赛胜率'],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_HeroLeague.sum
            var count = dataPersonal.PlayerBase.game_total_HeroLeague.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    'WeekTeamLeague_win_rate': [
        ['Team League Win Rate', '团队联赛胜率'],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_TeamLeague.sum
            var count = dataPersonal.PlayerBase.game_total_TeamLeague.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    'WeekUnrankedDraft_win_ate': [
        ['Unranked Draft Win Rate', '非排名模式胜率'],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_UnrankedDraft.sum
            var count = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    //1-1
    'week_party_total': [
        ['Premades Total', '开黑次数'],
        function () {
            var data = dataPersonal.PlayerBase.party_total.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //1-2
    'week_party_win': [
        ['Premades Wins', '开黑获胜次数'],
        function () {
            var data = dataPersonal.PlayerBase.party_win.sum
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    'week_party_win_rate': [
        ['Premades Win Rate', '开黑胜率'],
        function () {
            var sum = dataPersonal.PlayerBase.party_win.sum
            var count = dataPersonal.PlayerBase.party_total.sum
            return count > 0 ? [
                (sum / count).toFixed(2) * 100 + "%",
                (sum / count).toFixed(2) * 100 + "%",
            ] : false
        }
    ],
    'week_team1_count': [
        ['Played in Team 1', '在右上方的游戏次数'],
        function () {
            var data = dataPersonal.PlayerBase.team1_count.sum
            return [
                data + " times",
                data + ' 次'
            ]
        }
    ],
    'week_level': [
        ['Average Level', '平均等级(游戏结束时)'],
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
    'week_take_downs': [
        ['Take Downs', '总参与击杀'],
        function () {
            var data = dataPersonal.PlayerBase.Takedowns.sum
            return [
                data + " times",
                data + ' 次'
            ]
        }
    ],
    'week_solo_kills': [
        ['Solo Kills', '最后一击'],
        function () {
            var data = dataPersonal.PlayerBase.SoloKills.sum
            return [
                data + " times",
                data + ' 次'
            ]
        }
    ],
    'week_assists': [
        ['Assists', '助攻'],
        function () {
            var data = dataPersonal.PlayerBase.Assists.sum
            return [
                data + " times",
                data + ' 次'
            ]
        }
    ],
    'week_deaths': [
        ['Deaths', '死亡'],
        function () {
            var data = dataPersonal.PlayerBase.Deaths.sum
            return [
                data + " times",
                data + ' 次'
            ]
        }
    ],
    'week_max_level': [
        ['Max Level Reached', '最高等级'],
        function () {
            var arr = object_to_array(dataPersonal.PlayerBase.Level_count.sum)
            var data = arr[arr.length - 1]
            return [
                data,
                data + ' 级'
            ]
        }
    ],
    'week_min_level': [
        ['Min Level Reached', '最低等级'],
        function () {
            var arr = object_to_array(dataPersonal.PlayerBase.Level_count.sum)
            var data = arr[0]
            return [
                data,
                data + ' 级'
            ]
        }
    ],
    'week_hero_damage': [
        ['Hero Damage', '英雄总伤害'],
        function () {
            var data = dataPersonal.PlayerBase.HeroDamage.sum
            return [
                data,
                data + ' 点伤害'
            ]
        }
    ],
    'week_siege_damage': [
        ['Siege Damage', '攻城总伤害'],
        function () {
            var data = dataPersonal.PlayerBase.SiegeDamage.sum
            return [
                data,
                data + ' 点伤害'
            ]
        }
    ],
    'week_structure_damage': [
        ['Structure Damage', '建筑总伤害'],
        function () {
            var data = dataPersonal.PlayerBase.StructureDamage.sum
            return [
                data,
                data + ' 点伤害'
            ]
        }
    ],
    'week_minion_damage': [
        ['Minion Damage', '小兵总伤害'],
        function () {
            var data = dataPersonal.PlayerBase.MinionDamage.sum
            return [
                data,
                data + ' 点伤害'
            ]
        }
    ],
    //creepdamage
    'week_creep_damage': [
        ['Creep Damage', '地图机制总伤害'],
        function () {
            var data = dataPersonal.PlayerBase.CreepDamage.sum
            return [
                data,
                data + ' 点伤害'
            ]
        }
    ],
    'week_summon_damage': [
        ['Summon Damage', '召唤物总伤害'],
        function () {
            var data = dataPersonal.PlayerBase.SummonDamage.sum
            return [
                data,
                data + ' 点伤害'
            ]
        }
    ],
    'week_TimeCCd_enemy_heroes': [
        ['Enemy Heroes CC Length', '控制敌方英雄总时长'],
        function () {
            var data = dataPersonal.PlayerBase.TimeCCdEnemyHeroes.sum
            return [
                data + " seconds",
                data + ' 秒'
            ]
        }
    ],
    'week_self_healing': [
        ['Self healing', '自我治疗'],
        function () {
            var data = dataPersonal.PlayerBase.SelfHealing.sum
            return [
                data + "heal",
                data + '点治疗'
            ]
        }
    ],
    'week_experience_contribution': [
        ['ExperienceContribution', '经验贡献'],
        function () {
            var data = dataPersonal.PlayerBase.ExperienceContribution.sum
            return [
                data,
                data + ' 点经验'
            ]
        }
    ],
    'week_healing': [
        ['Healing', ' 总治疗'],
        function () {
            var data = dataPersonal.PlayerBase.Healing.sum
            return [
                data,
                data + ' 点治疗'
            ]
        }
    ],
    'WeekWinRate': [
        ['Win rate', '周胜率'],
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
    'MrecCamp': [
        ['MercCamp Captures', '雇佣兵占领次数'],
        function () {
            var times = dataPersonal.PlayerBase.MercCampCaptures.sum
            return [
                times,
                times + " 次",
            ]
        }
    ],
    'TimeSilencing': [
        ['Enemy Heroes Silenced', '沉默敌人的时间'],
        function () {
            var times = dataPersonal.PlayerBase.TimeSilencingEnemyHeroes.sum
            return [
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    'TimeRooting': [
        ['Enemy Heroes Rooted', '定身敌人的时间'],
        function () {
            var times = dataPersonal.PlayerBase.TimeRootingEnemyHeroes.sum
            return [
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    'TimeStunning': [
        ['Enemy Heroes Stunned', '眩晕敌人的时间'],
        function () {
            var times = dataPersonal.PlayerBase.TimeStunningEnemyHeroes.sum
            return [
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    'ClutchHealsPerformed': [
        ['Clutch Heals Performed', '关键治疗次数'],
        function () {
            var times = dataPersonal.PlayerBase.ClutchHealsPerformed.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    'EscapesPerformed': [
        ['Escapes Performed', '死里逃生次数'],
        function () {
            var times = dataPersonal.PlayerBase.EscapesPerformed.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    'VengeancesPerformed': [
        ['Vengeances Performed', '复仇次数'],
        function () {
            var times = dataPersonal.PlayerBase.VengeancesPerformed.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    'TeamfightEscapesPerformed': [
        ['Teamfight Escapes Performed', '团战逃脱的次数'],
        function () {
            var times = dataPersonal.PlayerBase.TeamfightEscapesPerformed.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    'OutnumberedDeaths': [
        ['Outnumbered Deaths', '被Gank的次数'],
        function () {
            var times = dataPersonal.PlayerBase.OutnumberedDeaths.sum
            return [
                times + " times",
                times + " 次",
            ]
        }
    ],
    'WinsWarrior': [
        ['Wins Warrior', '前排胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsWarrior.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsAssassin': [
        ['Wins Assassin', '刺杀胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsAssassin.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsSupport': [
        ['Wins Support', '治疗胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsSupport.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsSpecialist': [
        ['Wins Specialist', '专业胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsSpecialist.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsStarCraft': [
        ['Wins StarCraft', '星际英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsStarCraft.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsDiablo': [
        ['Wins Diablo', '暗黑英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsDiablo.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsWarcraft': [
        ['Wins Warcraft', '魔兽英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsWarcraft.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsMale': [
        ['Wins Male', '男性英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsMale.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsFemale': [
        ['Wins Female', '女性英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsFemale.sum
            return [
                times + " times",
                times + " 局",
            ]
        }
    ],

    'GamesOfWarrior': [
        ['Tanks Played', '前排英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysWarrior.sum
            return [
                games + 'times',
                games + '局'
            ]
        }
    ],
    'GamesOfAssassin': [
        ['Assassins Played', '刺杀英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysAssassin.sum
            return [
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfSupport': [
        ['Supports Played', '治疗英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysSupport.sum
            return [
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfSpecialist': [
        ['Specialists Played', '专业英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysSpecialist.sum
            return [
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfMale': [
        ['Male Played', '男性英雄周局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysMale.sum
            return [
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfFemale': [
        ['Female Played', '女性英雄周局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysFemale.sum
            return [
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'TimesOfDragon': [
        ['Take Dragons in this week', '开启龙骑士次数'],
        function () {
            var games = dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum
            return [
                games + ' times',
                games + ' 次'
            ]
        }
    ],
    'TimesOfDtagonShrines': [
        ['DragonSrines Taken', '占领龙骑士祭坛次数'],
        function () {
            var games = dataPersonal.PlayerBase.DragonShrinesCaptured.sum
            return [
                games + ' times',
                games + ' 次'
            ]
        }
    ],
    'NumbersOfGardensSeeds': [
        ['GardensSeeds Collected', '收集花园种子总数'],
        function () {
            var count = dataPersonal.PlayerBase.GardensSeedsCollected.sum
            return [
                count,
                count + ' 个'
            ]
        }
    ],
    'DamageOfGardensPlant': [
        ['GardensPlant Damage', '恐魔总伤害量'],
        function () {
            var dmg = dataPersonal.PlayerBase.GardensPlantDamage.sum
            return [
                dmg,
                dmg
            ]
        }
    ],
    'DamageDoneOfAltar': [
        ['Altar Damage Done', '占领天空殿祭坛造成的总伤害量'],
        function () {
            var dmg = dataPersonal.PlayerBase.AltarDamageDone.sum
            return [
                dmg,
                dmg
            ]
        }
    ],
    'DamageToImmortal': [
        ['Damage Done To Immortal', '对不朽者总伤害量'],
        function () {
            var dmg = dataPersonal.PlayerBase.DamageDoneToImmortal.sum
            return [
                dmg,
                dmg
            ]
        }
    ],
    'GemsTurned': [
        ['Gems Turned', '上交宝石周总量'],
        function () {
            var count = dataPersonal.PlayerBase.GemsTurnedIn.sum
            return [
                count,
                count
            ]
        }
    ],
    'RavenCollected': [
        ['Raven Tributes Collected', '乌鸦诅咒收集总量'],
        function () {
            var count = dataPersonal.PlayerBase.RavenTributesCollected.sum
            return [
                count,
                count
            ]
        }
    ],
    'MinesCollected': [
        ['Mines Skulls Collected', '鬼灵矿收集总量'],
        function () {
            var count = dataPersonal.PlayerBase.MinesSkullsCollected.sum
            return [
                count,
                count
            ]
        }
    ],
    'DoubloonsCollected': [
        ['Black heart Doubloons Collected', '达布隆币收集周总量'],
        function () {
            var count = dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
            return [
                count,
                count
            ]
        }
    ],
    'DoubloonsTurnedIn': [
        ['Black heart Doubloons Turned In', '达布隆币上交周总量'],
        function () {
            var count = dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
            return [
                count,
                count
            ]
        }
    ],
    'TimesInTemple': [
        ['Time In Temple', '天空殿占领祭坛周总时间'],
        function () {
            var count = dataPersonal.PlayerBase.TimeInTemple.sum
            return [
                count + ' seconds',
                count + ' 秒'
            ]
        }
    ],
    'NukeDamage': [
        ['Nuke Damage Done', '核弹总伤害'],
        function () {
            var dmg = dataPersonal.PlayerBase.NukeDamageDone.sum
            return [
                dmg,
                dmg
            ]
        }
    ],
    '2_WinRate': [
        ['The Win Rate of 2 Premades', '两人开黑胜率'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_2.sum;
            if (count <= 0)
                return false;

            var winRate = (dataPersonal.PlayerBase.party_win_2.sum / dataPersonal.PlayerBase.party_total_2.sum * 100).toFixed(2)
            return [
                winRate + '%',
                winRate + '%'
            ]
        }
    ],
    '3_WinRate': [
        ['The Win Rate of 3 Premades', '三人开黑胜率'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_3.sum;
            if (count <= 0)
                return false;

            var winRate = (dataPersonal.PlayerBase.party_win_3.sum / dataPersonal.PlayerBase.party_total_3.sum * 100).toFixed(2)
            return [
                winRate + '%',
                winRate + '%'
            ]
        }
    ],
    '4_WinRate': [
        ['The Win Rate of 4 Premades', '四人开黑胜率'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_4.sum;
            if (count <= 0)
                return false;

            var winRate = (dataPersonal.PlayerBase.party_win_4.sum / dataPersonal.PlayerBase.party_total_4.sum * 100).toFixed(2)
            return [
                winRate + '%',
                winRate + '%'
            ]
        }
    ],
    '5_WinRate': [
        ['The Win Rate of 5 Premades', '五人开黑胜率'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_5.sum;
            if (count <= 0)
                return false;

            var winRate = (dataPersonal.PlayerBase.party_win_5.sum / dataPersonal.PlayerBase.party_total_5.sum * 100).toFixed(2)
            return [
                winRate + '%',
                winRate + '%'
            ]
        }
    ],
    'MapsLength': [
        ['Total Duration Played on Each Map', '地图游戏时间'],
        function () {
            var mesEn = ''
            var mesZh = ''
            var separator = ''
            for (var map in dataPersonal.PlayerBase.maps_length.sum) {
                var times = dataPersonal.PlayerBase.maps_length.sum[map]
                mesEn = mesEn + separator + 'Map ' + map + ' - ' + (times / 60).toFixed(0) + ' minutes';
                mesZh = mesZh + separator + '地图 ' + map + ' - ' + (times / 60).toFixed(0) + ' 分钟';
                if (separator === '')
                    separator = ', '
            }
            return [
                mesEn,
                mesZh
            ]

        }
    ],
    'MapsTimes': [
        ['Times Played on Each Map', '地图游戏次数'],
        function () {
            var mesEn = ''
            var mesZh = ''
            var separator = ''
            for (var map in dataPersonal.PlayerBase.maps_total.sum) {
                var times = dataPersonal.PlayerBase.maps_total.sum[map]
                mesEn = mesEn + separator + 'Map ' + map + ' - ' + times + ' times'
                mesZh = mesZh + separator + '地图 ' + map + ' - ' + times + ' 次'
                if (separator === '')
                    separator = ', '
            }
            return [
                mesEn,
                mesZh
            ]

        }
    ],
    'MapsWin': [
        ['Wins on Each Map', '地图胜场数'],
        function () {
            var mesEn = ''
            var mesZh = ''
            var separator = ''
            for (var map in dataPersonal.PlayerBase.maps_win.sum) {
                var times = dataPersonal.PlayerBase.maps_win.sum[map]
                mesEn = mesEn + separator + 'Map ' + map + ' - ' + times + ' times'
                mesZh = mesZh + separator + '地图 ' + map + ' - ' + times + ' 次'
                if (separator === '')
                    separator = ', '
            }
            return [
                mesEn,
                mesZh
            ]

        }
    ],
    'LevelAchieve': [
        ['Team Level at End Of the Game', '游戏结束时的等级'],
        function () {
            var levelsEn = ''
            var levelsZh = ''
            var separator = ''
            for (var level in dataPersonal.PlayerBase.Level_count.sum) {
                var times = dataPersonal.PlayerBase.Level_count.sum[level]
                levelsEn = levelsEn + separator + 'Level ' + level + ' - ' + times + ' times'
                levelsZh = levelsZh + separator + '等级 ' + level + ' - ' + times + ' 次'
                if (separator === '')
                    separator = ', '
            }
            return [
                levelsEn,
                levelsZh
            ]

        }
    ],
    'LastGameTime': [
        ['Duration of the Last Game', '上一次游戏时间'],
        function () {
            var duration = timestamptotime(dataPersonal.PlayerBase.last_game_time.max)
            return [
                duration,
                duration
            ]
        }
    ],
}

var events = {
    'ZergKiller': [
        ['Zerg Killer', '虫群杀手'],
        function () {
            if (dataPersonal.PlayerBase.maps_total.sum[12] <= 0)
                return false;

            var avgDamage = Math.round(dataPersonal.PlayerBase.DamageDoneToZerg.sum / dataPersonal.PlayerBase.maps_total.sum[12])
            var limit = avgDamage > 5000
            return limit ?
                [
                    'You made ' + avgDamage + ' zerg damage on average in Braxis Holdout',
                    '平均每场布莱克西斯禁区中，你对虫群造成 ' + avgDamage + ' 点伤害'
                ] : false
        }
    ],
    'WinRate': [
        ['Amazing Win Rate', '令人惊讶的胜率'],
        function () {
            if (dataPersonal.PlayerBase.game_total.sum <= 0 || dataGlobal.PlayerBase.game_total.sum <= 0)
                return false;

            var myWinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
            var globalWinRate = (dataGlobal.PlayerBase.game_win.sum / dataGlobal.PlayerBase.game_total.sum * 100).toFixed(2)
            var limit = myWinRate > 1.2 * globalWinRate
            return limit ?
                [
                    'Your win rate (' + myWinRate + '%) is far higher than the global average (' + globalWinRate + '%)',
                    '你的胜率 (' + myWinRate + '%) 远远高于全球平均水平 (' + globalWinRate + '%)'
                ] : false
        }
    ],
    'TheLightOfSupport': [
        ['The Light of Support', '辅助之光'],
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
                    'Among your ' + gameTotal + ' games you have played last week, you chose ' + gameTotal + ' times as Support heroes, that was ' + SupportRate + ' of your total games, with the ' + SupportWinRate + ' WinRate',
                    '上周你在 ' + gameTotal + ' 局里，玩了 ' + Support + ' 局辅助，占了总局数的 ' + SupportRate + '%' + '，您辅助的胜率是 ' + SupportWinRate
                ] : false
        }
    ],
    'DragonRider': [
        ['Dragon Rider', '龙骑士'],
        function () {
            var myDragon = (dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataPersonal.PlayerBase.maps_total.sum[7]).toFixed(2)
            var globalDragon = (dataGlobal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataGlobal.PlayerBase.maps_total.sum[7]).toFixed(2)
            var limit = myDragon > 2 * globalDragon
            var times = Math.round(myDragon / globalDragon)
            return limit ?
                [
                    'You are a real DragonRider with the ' + times + ' times more than the global average ' + globalDragon + ' times',
                    '你开龙的次数是全球平均水平的 ' + times + ' 倍呢！真是个名副其实的龙骑士！'
                ] : false
        }
    ],
    'Premades': [
        ['The King of Premades', '开黑小能手'],
        function () {
            var rate_2 = (dataPersonal.PlayerBase.party_win_2.sum / dataPersonal.PlayerBase.party_win_2.sum * 100).toFixed(2)
            var rate_3 = (dataPersonal.PlayerBase.party_win_3.sum / dataPersonal.PlayerBase.party_win_3.sum * 100).toFixed(2)
            var rate_4 = (dataPersonal.PlayerBase.party_win_4.sum / dataPersonal.PlayerBase.party_win_4.sum * 100).toFixed(2)
            var rate_5 = (dataPersonal.PlayerBase.party_win_5.sum / dataPersonal.PlayerBase.party_win_5.sum * 100).toFixed(2)
            var limit = rate_2 > 0.5 && rate_3 > 0.5 && rate_4 > 0.5 && rate_5 > 0.5
            return limit ?
                [
                    'Your Win Rate of Premades were all beyond 50%, nice team work!',
                    '你和好友开黑的胜率都超过了50%，是个名副其实的开黑小能手呢'
                ] : false
        }
    ],
    'Miser': [
        ['Miser', '吝啬鬼'],
        function () {
            var Collected = dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
            var TurnedIn = dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
            var limit = TurnedIn < 0.6 * Collected
            return limit ?
                [
                    'On Black Heart Bay, you collected ' + Collected + ' Doubloons Coins ' + ', but you only successfully turned in ' + TurnedIn + '. You should look for more opportunities to turn in',
                    '黑心湾地图中，你收集了' + Collected + '个达布隆币' + ',但是你只成功上交了' + TurnedIn + '个达布隆币，你应该多寻找机会上交'
                ] : false
        }
    ],
    'UselessRavenTributes': [
        ['Useless Raven Tributes', '无用的乌鸦诅咒'],
        function () {
            var Collected = dataPersonal.PlayerBase.RavenTributesCollected.sum
            var Damage = dataPersonal.PlayerBase.CurseDamageDone.sum
            var Collected_gol = dataGlobal.PlayerBase.RavenTributesCollected.sum
            var Damage_gol = dataPersonal.PlayerBase.CurseDamageDone.sum
            var limit = Collected > 0.8 * Collected_gol && Damage < 0.5 * Damage_gol
            return limit ?
                [
                    'On Curse Valley, your curse damage was ' + Damage + ', and the global average was ' + Damage_gol + '. Use the curse time to get the maximum curse damage, such as pushing the line, pushing the tower, etc..',
                    '诅咒谷地图中，你的诅咒伤害是 ' + Damage + ',而全球平均水平是 ' + Damage_gol + ' 。要善用诅咒时间来获取最大的诅咒伤害，比如跟推吃线、推塔等等。'
                ] : false
        }
    ],
    'PartyWinRate': [
        ['Good Bro', '好兄弟'],
        function () {
            var myPartyWinRate = (dataPersonal.PlayerBase.party_win.sum / dataPersonal.PlayerBase.party_total.sum * 100).toFixed(2)
            var globalPartyWinRate = (dataGlobal.PlayerBase.party_win.sum / dataGlobal.PlayerBase.party_total.sum * 100).toFixed(2)
            var limit = myPartyWinRate > 1.2 * globalPartyWinRate
            return limit ?
                [
                    "Your party win rate (" + myPartyWinRate + "%) was far higher than the global average (" + globalPartyWinRate + "%)",
                    "你与好友开黑的胜率 (" + myPartyWinRate + "%) 远远高于全球平均水平 (" + globalPartyWinRate + "%)"
                ] : false
        }
    ],
    'HeroDamage': [
        ['Massive Hero Damage', '大量英雄伤害'],
        function () {
            var myHeroDamage = Math.round(dataPersonal.PlayerBase.HeroDamage.sum)
            var globalHeroDamage = Math.round(dataGlobal.PlayerBase.HeroDamage.sum)
            var limit = myHeroDamage > 1.5 * globalHeroDamage
            return limit ?
                [
                    "Your HeroDamage (" + myHeroDamage + "%) wa far higher than the global average (" + globalHeroDamage + "%)",
                    "你英雄伤害 (" + myHeroDamage + "%) 远远高于全球平均水平 (" + globalHeroDamage + "%)"
                ] : false
        }
    ],
    'TownKills': [
        ['Town Kills', '防御塔击杀'],
        function () {
            var data = dataPersonal.PlayerBase.TownKills.sum
            var limit = data > 5
            return limit ?
                [
                    "You are killed by towers for " + data + " times",
                    "您被防御塔击杀了 " + data + " 次",
                ] : false
        }
    ],
    'ControlMan': [
        ['Control Man', '掌控者'],
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
    'MrecCampMan': [
        ['MercCamp King', '雇佣王'],
        function () {
            var myWinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
            var times = dataPersonal.PlayerBase.MercCampCaptures.sum
            var games = dataPersonal.PlayerBase.game_total.sum
            var final = times / games
            var limit = final > 4 && myWinRate > 50
            return limit ? [
                "You captured " + times + " camps per game. This have made your winning percentage to " + myWinRate,
                "这周你平均每场占领了 " + times + " 次雇佣兵，良好的开野习惯使你的胜率达到了 " + myWinRate,
            ] : false
        }
    ],
}



// Todo: 排行榜，等待接口支持
var ranking = {}
