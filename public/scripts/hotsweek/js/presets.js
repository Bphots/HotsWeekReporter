//将Level_count等字段中的对象转为数组
var object_to_array = function (object) {
    var arr = [];
    for(var i in Object.keys(object)){
        arr.push(Object.keys(object)[i]);
    }
    return arr;
}
var timestamptotime = function(time){
    var date = new Date(time * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = (date.getHours()<10 ? '0'+date.getHours():date.getHours()) + ':';
    var m = (date.getMinutes()<10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
    var s = date.getSeconds()<10 ? '0'+date.getSeconds():date.getSeconds();
    return Y+M+D+h+m+s;
}
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
			var data = dataPersonal.PlayerBase.game_total.sum
			return [
				data + ' times',
				data + ' 局'
			]
		}
	],
    'WeekWin': [
		['Win', '周胜场'],
		function () {
			var data = dataPersonal.PlayerBase.game_win.sum
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
    'WeekQuickMatch_length': [
        ['Quick Match Length', '快速比赛时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_QuickMatch.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_QuickMatch_avg_length': [
        ['Quick Match Avg Length', '快速比赛平均时长'],
        function () {
            var sum = dataPersonal.PlayerBase.game_length_QuickMatch.sum
            var count = dataPersonal.PlayerBase.game_total_QuickMatch.sum
            return count > 0 ? [
                ((sum / 60) / count).toFixed(0) + " minutes",
                ((sum / 60) / count).toFixed(0) + " 分钟",
            ] : false;
        }
    ],
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
    'WeekQuickMatch_total': [
        ['Quick Match Total', '快速比赛总场次'],
        function () {
            var sum = dataPersonal.PlayerBase.game_total_QuickMatch.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    'WeekHeroLeague_total': [
        ['Hero League Total', '英雄联赛总场次'],
        function () {
            var sum = dataPersonal.PlayerBase.game_total_HeroLeague.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    'WeekTeamLeague_total': [
        ['Team League Total', '团队联赛总场次'],
        function () {
            var sum = dataPersonal.PlayerBase.game_total_TeamLeague.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    'WeekUnrankedDraft_total': [
        ['Unranked Draft Total', '非排名模式总场次'],
        function () {
            var sum = dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    'WeekQuickMatch_win': [
        ['Quick Match Win', '快速比赛胜场'],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_QuickMatch.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    'WeekHeroLeague_win': [
        ['Hero League Win', '英雄联赛胜场'],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_HeroLeague.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    'WeekTeamLeague_win': [
        ['Team League Win', '团队联赛胜场'],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_TeamLeague.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    'WeekUnrankedDraft_win': [
        ['Unranked Draft Win', '非排名模式胜场'],
        function () {
            var sum = dataPersonal.PlayerBase.game_win_UnrankedDraft.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    'WeekQuickMatch_win_rate': [
        ['Quick Match Win Rate', '快速比赛胜率'],
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
    'week_party_total': [
        ['Premades total', '开黑次数'],
        function () {
            var sum = dataPersonal.PlayerBase.party_total.sum
            return [
                sum + ' times',
                sum + ' 局'
            ]
        }
    ],
    //1-2
    'week_party_win': [
        ['Premades win', '开黑获胜次数'],
        function () {
            var sum = dataPersonal.PlayerBase.party_win.sum
            return [
                sum + ' times',
                sum + ' 局'
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
        ['Played In Team 1', '在右上方的游戏次数'],
        function () {
            var sum = dataPersonal.PlayerBase.team1_count.sum
            return [
                sum + " times",
                sum + ' 次'
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
            var sum = dataPersonal.PlayerBase.Takedowns.sum
            return [
                sum + " times",
                sum + ' 次'
            ]
        }
    ],
    'week_solo_kills': [
        ['Solo Kills', '最后一击'],
        function () {
            var sum = dataPersonal.PlayerBase.SoloKills.sum
            return [
                sum + " times",
                sum + ' 次'
            ]
        }
    ],
    'week_assists': [
        ['Assists', '助攻'],
        function () {
            var sum = dataPersonal.PlayerBase.Assists.sum
            return [
                sum + " times",
                sum + ' 次'
            ]
        }
    ],
    'week_deaths': [
        ['Deaths', '死亡'],
        function () {
            var sum = dataPersonal.PlayerBase.Deaths.sum
            return [
                sum + " times",
                sum + ' 次'
            ]
        }
    ],
    'week_avg_highest_kill_streak': [
        ['Average Highest Kill Streak', '平均最高连杀'],
        function () {
            var avg=dataPersonal.PlayerBase.HighestKillStreak.sum
            var game=dataPersonal.PlayerBase.game_total.sum
            return [
                (avg/game).toFixed(0) + " times",
                (avg/game).toFixed(0) + " 次",
            ]
        }
    ],
    'week_max_level': [
        ['Max Level Reached', '最高等级'],
        function () {
            var arr = object_to_array(dataPersonal.PlayerBase.Level_count.sum)
            var data = arr[arr.length-1]
            return [
                data,
                data + ' 级'
            ]
        }
    ],
    'week_min_level': [
        ['Min Level Reached', '最低等级'],
        function () {
            var  arr = object_to_array(dataPersonal.PlayerBase.Level_count.sum)
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
            var sum = dataPersonal.PlayerBase.HeroDamage.sum
            return [
                sum,
                sum + ' 伤害'
            ]
        }
    ],
    'week_siege_damage': [
        ['Siege Damage', '攻城总伤害'],
        function () {
            var sum = dataPersonal.PlayerBase.SiegeDamage.sum
            return [
                sum,
                sum + ' 伤害'
            ]
        }
    ],
    'week_structure_damage': [
        ['Structure Damage', '建筑总伤害'],
        function () {
            var sum = dataPersonal.PlayerBase.StructureDamage.sum
            return [
                sum,
                sum + ' 伤害'
            ]
        }
    ],
    'week_minion_damage': [
        ['Minion Damage', '小兵总伤害'],
        function () {
            var sum = dataPersonal.PlayerBase.MinionDamage.sum
            return [
                sum,
                sum + ' 伤害'
            ]
        }
    ],
    //creepdamage
    'week_creep_damage': [
        ['Creep Damage', '地图机制总伤害'],
        function () {
            var sum = dataPersonal.PlayerBase.CreepDamage.sum
            return [
                sum,
                sum + ' 伤害'
            ]
        }
    ],
    'week_summon_damage': [
        ['Summon Damage', '召唤物总伤害'],
        function () {
            var data = dataPersonal.PlayerBase.SummonDamage.sum
            return [
                data,
                data + ' 伤害'
            ]
        }
    ],
    'week_TimeCCd_enemy_heroes': [
        ['Enemy Heroes CC Length', '控制敌方英雄总时长'],
        function () {
            var sum = dataPersonal.PlayerBase.TimeCCdEnemyHeroes.sum
            return [
                sum + " second",
                sum + ' 秒'
            ]
        }
    ],
    'week_self_healing': [
        ['Self Healing', '自我治疗'],
        function () {
            var sum = dataPersonal.PlayerBase.SelfHealing.sum
            return [
                sum + " heal",
                sum + ' 点治疗'
            ]
        }
    ],
    'week_experience_contribution': [
        ['Experience Contribution', '经验贡献'],
        function () {
            var sum = dataPersonal.PlayerBase.ExperienceContribution.sum
            return [
                sum,
                sum + ' 经验'
            ]
        }
    ],
    'week_healing': [
        ['Healing', '治疗'],
        function () {
            var sum = dataPersonal.PlayerBase.Healing.sum
            return [
                sum,
                sum + ' 点治疗'
            ]
        }
    ],
    'WeekWinRate': [
        ['Win Rate', '周胜率'],
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
            return[
                times,
                times+" 次",
            ]
        }
    ],
    'TimeSilencing': [
        ['Enemy Heroes Silenced', '沉默敌人的时间'],
        function () {
            var times = dataPersonal.PlayerBase.TimeSilencingEnemyHeroes.sum
            return[
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    'TimeRooting': [
        ['Enemy Heroes Rooted', '定身敌人的时间'],
        function () {
            var times = dataPersonal.PlayerBase.TimeRootingEnemyHeroes.sum
            return[
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    'TimeStunning': [
        ['Enemy Heroes Stunned', '眩晕敌人的时间'],
        function () {
            var times = dataPersonal.PlayerBase.TimeStunningEnemyHeroes.sum
            return[
                times + " seconds",
                times + " 秒",
            ]
        }
    ],
    'ClutchHealsPerformed': [
        ['Clutch Heals Performed', '关键治疗次数'],
        function () {
            var times = dataPersonal.PlayerBase.ClutchHealsPerformed.sum
            return[
                times + " times",
                times + " 次",
            ]
        }
    ],
    'EscapesPerformed': [
        ['Escapes Performed', '死里逃生次数'],
        function () {
            var times = dataPersonal.PlayerBase.EscapesPerformed.sum
            return[
                times + " times",
                times + " 次",
            ]
        }
    ],
    'VengeancesPerformed': [
        ['Vengeances Performed', '复仇次数'],
        function () {
            var times = dataPersonal.PlayerBase.VengeancesPerformed.sum
            return[
                times + " times",
                times + " 次",
            ]
        }
    ],
    'TeamfightEscapesPerformed': [
        ['Teamfight Escapes Performed', '团战逃脱的次数'],
        function () {
            var times = dataPersonal.PlayerBase.TeamfightEscapesPerformed.sum
            return[
                times + " times",
                times + " 次",
            ]
        }
    ],
    'OutnumberedDeaths': [
        ['Outnumbered Deaths', '被Gank的次数'],
        function () {
            var times = dataPersonal.PlayerBase.OutnumberedDeaths.sum
            return[
                times + " times",
                times + " 次",
            ]
        }
    ],
    'WinsWarrior': [
        ['Wins Warrior', '战斗型胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsWarrior.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsAssassin': [
        ['Wins Assassin', '刺杀型胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsAssassin.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsSupport': [
        ['Wins Support', '辅助型胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsAssassin.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsSpecialist': [
        ['Wins Specialist', '专业型胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsSpecialist.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsStarCraft': [
        ['Wins StarCraft', '星际英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsStarCraft.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsDiablo': [
        ['Wins Diablo', '暗黑英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsDiablo.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsWarcraft': [
        ['Wins Warcraft', '魔兽英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsWarcraft.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsMale': [
        ['Wins Male', '男性英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsMale.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],
    'WinsFemale': [
        ['Wins Female', '女性英雄胜场'],
        function () {
            var times = dataPersonal.PlayerBase.WinsFemale.sum
            return[
                times + " times",
                times + " 局",
            ]
        }
    ],

    'GamesOfWarrior': [
        ['Tanks Played', '战斗型英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysWarrior.sum
            return[
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfAssassin': [
        ['Assassins Played', '刺杀型英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysAssassin.sum
            return[
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfSupport': [
        ['Plays Support', '治疗型英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysSupport.sum
            return[
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfSpecialist': [
        ['Plays Specialist', '专业型英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysSpecialist.sum
            return[
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfMale': [
        ['Male Played', '男性英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysMale.sum
            return[
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'GamesOfFemale': [
        ['Female Played', '女性英雄局数'],
        function () {
            var games = dataPersonal.PlayerBase.PlaysFemale.sum
            return[
                games + ' times',
                games + ' 局'
            ]
        }
    ],
    'TimesOfDtagon': [
        ['Take Dragons In This Week', '开启龙骑士次数'],
        function () {
            var games = dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum
            return[
                games + ' times',
                games + ' 次'
            ]
        }
    ],
    'TimesOfDtagonShrines': [
        ['DragonSrines Taken', '占领龙骑士祭坛次数'],
        function () {
            var games = dataPersonal.PlayerBase.DragonShrinesCaptured.sum
            return[
                games + ' times',
                games + ' 次'
            ]
        }
    ],
    'NumbersOfGardensSeeds': [
        ['GardensSeeds Collected', '收集花园种子总数'],
        function () {
            var count = dataPersonal.PlayerBase.GardensSeedsCollected.sum
            return[
                count,
                count+' 个'
            ]
        }
    ],
    'DamageOfGardensPlant': [
        ['GardensPlant Damage', '恐魔总伤害量'],
        function () {
            var dmg = dataPersonal.PlayerBase.GardensPlantDamage.sum
            return[
                dmg,
                dmg
            ]
        }
    ],
    'DamageDoneOfAltar': [
        ['Altar Damage Done', '占领天空殿祭坛造成的总伤害量'],
        function () {
            var dmg = dataPersonal.PlayerBase.AltarDamageDone.sum
            return[
                dmg,
                dmg
            ]
        }
    ],
    'DamageToImmortal': [
        ['Damage Done To Immortal', '对不朽者总伤害量'],
        function () {
            var dmg = dataPersonal.PlayerBase.DamageDoneToImmortal.sum
            return[
                dmg,
                dmg
            ]
        }
    ],
    'GemsTurned': [
        ['Gems Turned In', '上交宝石总量'],
        function () {
            var count = dataPersonal.PlayerBase.GemsTurnedIn.sum
            return[
                count,
                count
            ]
        }
    ],
    'RavenCollected': [
        ['Raven Tributes Collected', '乌鸦诅咒收集总量'],
        function () {
            var count = dataPersonal.PlayerBase.RavenTributesCollected.sum
            return[
                count,
                count
            ]
        }
    ],
    'MinesCollected': [
        ['Mines Skulls Collected', '鬼灵矿收集总量'],
        function () {
            var count = dataPersonal.PlayerBase.MinesSkullsCollected.sum
            return[
                count,
                count
            ]
        }
    ],
    'DoubloonsCollected': [
        ['Black Heart Doubloons Collected', '达布隆币收集总量'],
        function () {
            var count = dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
            return[
                count,
                count
            ]
        }
    ],
    'DoubloonsTurnedIn': [
        ['Black Heart Doubloons Turned In', '达布隆币上交总量'],
        function () {
            var count = dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
            return[
                count,
                count
            ]
        }
    ],
    'TimesInTemple': [
        ['Time In Temple', '天空殿占领祭坛总时间'],
        function () {
            var count = dataPersonal.PlayerBase.TimeInTemple.sum
            return[
                count+' seconds',
                count+' s'
            ]
        }
    ],
    'NukeDamage': [
        ['Nuke Damage Done', '核弹头总伤害'],
        function () {
            var dmg = dataPersonal.PlayerBase.NukeDamageDone.sum
            return[
                dmg,
                dmg
            ]
        }
    ],
    '2_Plays_total': [
        ['The Games of 2 Premades', '两人开黑场数'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_2.sum;

            return[
                count,
                count
            ]
        }
    ],
    '3_Plays_total': [
        ['The Games of 3 Premades', '三人开黑场数'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_3.sum;

            return[
                count,
                count
            ]
        }
    ],
    '4_Plays_total': [
        ['The Games 4 Premades', '四人开黑场数'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_4.sum;

            return[
                count,
                count
            ]
        }
    ],
    '5_Plays_total': [
        ['The Games 5 Premades', '五人开黑场数'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_5.sum;

            return[
                count,
                count
            ]
        }
    ],
    '2_WinRate': [
        ['The Win Rate of 2 Premades', '两人开黑胜率'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_2.sum;
            if (count < 0)
                return false;

            var WinRate=(dataPersonal.PlayerBase.party_win_2.sum / dataPersonal.PlayerBase.party_total_2.sum * 100).toFixed(2)
            return[
                WinRate + '%',
                WinRate + '%'
            ]
        }
    ],
    '3_WinRate': [
        ['The Win Rate of 3 Premades', '三人开黑胜率'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_3.sum;
            if (count <= 0)
                return false;

            var WinRate = (dataPersonal.PlayerBase.party_win_3.sum / dataPersonal.PlayerBase.party_total_3.sum * 100).toFixed(2)
            return[
                WinRate + '%',
                WinRate + '%'
            ]
        }
    ],
    '4_WinRate': [
        ['The WinRate of 4 Premades', '四人开黑胜率'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_4.sum;
            if (count <= 0)
                return false;

            var WinRate = (dataPersonal.PlayerBase.party_win_4.sum / dataPersonal.PlayerBase.party_total_4.sum * 100).toFixed(2)
            return[
                WinRate + '%',
                WinRate + '%'
            ]
        }
    ],
    '5_WinRate': [
        ['The WinRate of 5 Premades', '五人开黑胜率'],
        function () {
            var count = dataPersonal.PlayerBase.party_total_5.sum;
            if (count <= 0)
                return false;

            var WinRate = (dataPersonal.PlayerBase.party_win_5.sum / dataPersonal.PlayerBase.party_win_5.sum * 100).toFixed(2)
            return[
                WinRate + '%',
                WinRate + '%'
            ]
        }
    ],
    'MapsLength': [
        ['Total Duration Played On Each Map', '地图游戏时间'],
        function () {
            var map_time = dataPersonal.PlayerBase.maps_length.sum
            return [
                map_time ,
                map_time
            ]

        }
    ],
    'MapsTimes': [
        ['Times Played On Each Map ', '地图游戏次数'],
        function () {
            var map_total = dataPersonal.PlayerBase.maps_total.sum
            return [
                map_total ,
                map_total
            ]

        }
    ],
    'MapsWin': [
        ['Wins On Each Map ', '地图胜场数'],
        function () {
            var map_win = dataPersonal.PlayerBase.maps_win.sum
            return [
                map_win ,
                map_win
            ]

        }
    ],
    'LevelAchieve': [
        ['Team Level At End Of The Game', '游戏结束时的等级'],
        function () {
            var level_gameEnd = dataPersonal.PlayerBase.Level_count.sum
            return [
                level_gameEnd,
                level_gameEnd
            ]

        }
    ],
    'LastGameTime': [
        ['Duration Of The Last Game', '上一次游戏时间'],
        function () {
            var duration = timestamptotime(dataPersonal.PlayerBase.last_game_time.max)
            return [
                duration,
                duration
            ]
        }
    ],
    'WeekGlobalMostUsed': [
        ['Global Most Used Heroes', '全球使用最多的英雄'],
        function () {
            var item = dataGlobal.PlayerHeroes._sumMax.game_total
            var heroID = item[0]
            var times = item[1]
            return [
                'Hero ' + heroID + ' was used ' + times + ' times',
                '英雄 ' + heroID + ' 被使用了 ' + times + ' 次'
            ]
        }
    ],
    'WeekGlobalTimes': [
        ['Global Times', '全球场次'],
        function () {
            var count = dataGlobal.PlayerBase.game_total.sum
            return [
                count + ' times',
                count + ' 局'
            ]
        }
    ],
    'WeekGlobalLength': [
        ['Global Length', '全球时长'],
        function () {
            var data = Math.round(dataGlobal.PlayerBase.game_length.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'WeekGlobalWin': [
        ['Global Win', '全球胜场'],
        function () {
            var data = dataGlobal.PlayerBase.game_win.sum 
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    'WeekGlobalMostWinInHeroLeague': [
        ['Global Most Win Heroes In Hero League', '英雄联赛全球胜率最高的英雄'],
        function () {
            var heroID = 0
            var winRate = 0
            var gloheroArr = []
            for(var i in dataGlobal.PlayerHeroes){
                gloheroArr.push(dataGlobal.PlayerHeroes[i])
            }
             for(var hero in gloheroArr){
                 if(gloheroArr[hero].game_total_HeroLeague.sum > 0) {
                     var Rate = (gloheroArr[hero].game_win_HeroLeague.sum / gloheroArr[hero].game_total_HeroLeague.sum * 100).toFixed(2)
                     if ( Rate > winRate) {
                         winRate = Rate
                         heroID = parseInt(hero) + 1
                     }
                 }
            }
            if(winRate <= 0)
                return false
            return [
                'Hero ' + heroID + ' Hero League WinRate is  ' + winRate + '%',
                '英雄 ' + heroID + ' 英雄联赛胜率是 ' + winRate + '%'
            ]
        }
    ],
    'WeekGlobalMostWinInTeamLeague': [
        ['Global Most Win Heroes In Team League', '团队联赛全球胜率最高的英雄'],
        function () {
            var heroID = 0
            var winRate = 0
            var gloheroArr = []
            for(var i in dataGlobal.PlayerHeroes){
                gloheroArr.push(dataGlobal.PlayerHeroes[i])
            }
            for(var hero in gloheroArr){
                if(gloheroArr[hero].game_total_TeamLeague.sum>0) {
                    var Rate = (gloheroArr[hero].game_win_TeamLeague.sum / gloheroArr[hero].game_total_TeamLeague.sum * 100).toFixed(2)
                    if ( Rate > winRate) {
                        winRate = Rate
                        heroID = parseInt(hero) + 1
                    }
                }
            }
            if(winRate <= 0)
                return false
            return [
                'Hero ' + heroID + ' Team League WinRate is  ' + winRate + '%',
                '英雄 ' + heroID + ' 团队联赛胜率是 ' + winRate + '%'
            ]
        }
    ],
    'WeekGlobalMostWinInQuickMatch': [
        ['Global Most Win Heroes In Quick Match', '快速比赛全球胜率最高的英雄'],
        function () {
            var heroID = 0
            var winRate = 0
            var gloheroArr = []
            for(var i in dataGlobal.PlayerHeroes){
                gloheroArr.push(dataGlobal.PlayerHeroes[i])
            }
            for(var hero in gloheroArr){
                if(gloheroArr[hero].game_total_QuickMatch.sum>0) {
                    var Rate = (gloheroArr[hero].game_win_QuickMatch.sum / gloheroArr[hero].game_total_QuickMatch.sum * 100).toFixed(2)
                    if (Rate > winRate) {
                        winRate = Rate
                        heroID = parseInt(hero) + 1
                    }
                }
            }
            if(winRate <= 0)
                return false
            return [
                'Hero ' + heroID + ' Quick Match WinRate is  ' + winRate + '%',
                '英雄 ' + heroID + ' 快速比赛胜率是 ' + winRate + '%'
            ]
        }
    ],
    'WeekGlobalMostWinInUnrankedDraft': [
        ['Global Most Win Heroes In Unranked Draft', '非排名模式全球胜率最高的英雄'],
        function () {
            var heroID = 0
            var winRate = 0
            var gloheroArr = []
            for(var i in dataGlobal.PlayerHeroes){
                gloheroArr.push(dataGlobal.PlayerHeroes[i])
            }
            for(var hero in gloheroArr){
                if(gloheroArr[hero].game_total_UnrankedDraft.sum>0) {
                    var Rate = (gloheroArr[hero].game_win_UnrankedDraft.sum / gloheroArr[hero].game_total_UnrankedDraft.sum * 100).toFixed(2)
                    if (Rate > winRate) {
                        winRate = Rate
                        heroID = parseInt(hero) + 1
                    }
                }
            }
            if(winRate <= 0)
                return false
            return [
                'Hero ' + heroID + ' Unranked Draft WinRate is  ' + winRate + '%',
                '英雄 ' + heroID + ' 非排名模式胜率是 ' + winRate + '%'
            ]
        }
    ],
}

var events = {
    'ZergKiller': [
		['Zerg Killer', '虫群杀手'],
		function () {
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
			var myWinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
			var globalWinRate = (dataGlobal.PlayerBase.game_win.sum / dataGlobal.PlayerBase.game_total.sum * 100).toFixed(2)
			var limit = myWinRate > 1.2 * globalWinRate
			return limit ?
				[
					'Your win rate (' + myWinRate + '%) is far higher than the global average (' + globalWinRate + '%) ',
					'你的胜率 (' + myWinRate + '%) 远远高于全球平均水平 (' + globalWinRate + '%) '
				] : false
		}
	],
    'TheLightOfSupport': [
        ['The Light Of Support', '辅助之光'],
        function () {
            var Support = dataPersonal.PlayerBase.PlaysSupport.sum
            var SupportWin = dataPersonal.PlayerBase.WinsSupport.sum
            var gameTotal = dataPersonal.PlayerBase.game_total.sum
            if (gameTotal <= 0 || Support <= 0)
                return false;

            var SupportRate = (Support/gameTotal*100).toFixed(2)
            var SupportWinRate = (SupportWin/Support*100).toFixed(2)
            var limit = SupportRate>0.5
            return limit ?
                [
                    'Among your ' + gameTotal + ' games you have played last week, you chose ' + gameTotal + ' times as Support heroes, that was ' + SupportRate + ' of your total games, with the ' + SupportWinRate + ' WinRate',
                    '上周你在 ' + gameTotal + ' 局里，玩了 ' + Support + ' 局辅助，占了总局数的 '+ SupportRate + ' %' + '，您辅助的胜率是 ' + SupportWinRate
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
                    'You are a real DragonRider with the ' + times + ' times more than the global average' + globalDragon + 'times',
                    '你开龙的次数是全球平均水平的 ' + times + ' 倍呢！真是个名副其实的龙骑士！'
                ] : false
        }
    ],
    'Premades': [
        ['The King Of Premades', '开黑小能手'],
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
            var limit = TurnedIn<0.6*Collected
            return limit ?
                [
                    'On Black Heart Bay, you collected ' + Collected + ' Doubloons Coins ' + ', but you only successfully turned in ' + TurnedIn + '. You should look for more opportunities to turn in',
                    '黑心湾地图中，你收集了 '+ Collected + ' 个达布隆币' + ',但是你只成功上交了 ' + TurnedIn + ' 个达布隆币，你应该多寻找机会上交'
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
                    '诅咒谷地图中，你的诅咒伤害是 '+Damage+' ,而全球平均水平是 '+Damage_gol+' 要善用诅咒时间来获取最大的诅咒伤害，比如跟推吃线、推塔等等。'
                ] : false
        }
    ],
    'PartyWinRate':[
        ['Good Bro','好兄弟'],
        function(){
            var myPartyWinRate = (dataPersonal.PlayerBase.party_win.sum / dataPersonal.PlayerBase.party_total.sum * 100).toFixed(2)
            var globalPartyWinRate = (dataGlobal.PlayerBase.party_win.sum / dataGlobal.PlayerBase.party_total.sum * 100).toFixed(2)
            var limit = myPartyWinRate > 1.2 * globalPartyWinRate
            return limit ?
                [
                    'Your party win rate ( ' + myPartyWinRate + ' %) was far higher than the global average (' + globalPartyWinRate +  '%) ',
                    '你与好友开黑的胜率 (' + myPartyWinRate + '%) 远远高于全球平均水平 (' + globalPartyWinRate + '%) '
                ]:false
        }
    ],
    'HeroDamage':[
        ['Massive Hero Damage','大量英雄伤害'],
        function(){
            var myHeroDamage = Math.round(dataPersonal.PlayerBase.HeroDamage.sum)
            var globalHeroDamage = Math.round(dataGlobal.PlayerBase.HeroDamage.sum)
            var limit = myHeroDamage > 1.5 * globalHeroDamage
            return limit ?
                [
                    'Your HeroDamage (' + myHeroDamage + '%) is far higher than the global average (' + globalHeroDamage + '%) ',
                    '你英雄伤害 (' + myHeroDamage + '%) 远远高于全球平均水平( ' + globalHeroDamage + '%) '
                ]:false
        }
    ],
    'TownKills':[
        ['Town Kills','防御塔击杀'],
        function(){
            var data = dataPersonal.PlayerBase.TownKills.sum
            var limit = data > 5
            return limit ?
                [
                    "You are killed by Town for "+ data + " times",
                    "您被防御塔击杀了 "+ data + " 次",
                ]:false
        }
    ],
    'ControlMan':[
        ['Control Man','掌控者'],
        function(){
           var data = Math.round(dataPersonal.PlayerBase.TimeCCdEnemyHeroes.sum)
           var  limit = data > 150
            return limit ?
                [
                    'You have controlled enemy hero for ' + data + ' seconds',
                    '这周你控制了敌方英雄 '+ data + ' 秒',
                ]:false
        }
    ],
    'MrecCampMan': [
        ['MercCamp King', '雇佣王'],
        function () {
            var myWinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
            var times = dataPersonal.PlayerBase.MercCampCaptures.sum
            var games = dataPersonal.PlayerBase.game_total.sum
            var result = times / games
            var limit = result > 4 && myWinRate >50
            return limit?[
                'You averaged '+ times +' MrecCampCaputers per game. Good occupiedCamp habits have made your winning percentage ' + myWinRate,
                "这周你平均每场占领了 "+times+" 次雇佣兵，良好的开野习惯使你的胜率达到了 "+myWinRate,
            ]:false
        }
    ],
    'WaterInDesert': [
        ['Water In Desert', '雪中送炭'],
        function () {
            var times_per= ( dataPersonal.PlayerBase.ClutchHealsPerformed.sum / dataPersonal.PlayerBase.PlaysSupport.sum ).toFixed(2)
            var times_glo= ( dataGlobal.PlayerBase.ClutchHealsPerformed.sum / dataGlobal.PlayerBase.PlaysSupport.sum).toFixed(2)
            var result = times_per / times_glo
            var limit = result > 1.2
            return limit?[
                'You have '+ times_per + ' Clutch Heals per game in the assist games, and you are the most reliable partner in the team.',
                '你在辅助型局中，平均每场有 ' + times_per + ' 次关键治疗，是团队中最可靠的伙伴',
            ]:false
        }
    ],
    'ServentOfSpiderQueen': [
        ['Servent Of Spider Queen', '蛛后的仆人'],
        function () {
            var TurnedIn= ( dataPersonal.PlayerBase.GemsTurnedIn.sum / dataPersonal.PlayerBase.maps_total.sum[5] ).toFixed(0)
            var limit = TurnedIn > 40
            return limit?[
                'On Tomb Of The Spider Queen, you Turned In ' + TurnedIn + ' per game, you are the very loyal servant of The sipder queen',
                '蛛后墓地图中，你平均每场上交了 '+ TurnedIn + ' 宝石，蛛后的忠心的仆从就是你啦',
            ]:false
        }
    ],
    'TheLoverHero': [
        ['The Hero', '本命英雄'],
        function () {
            var item = dataPersonal.PlayerHeroes._sumMax.game_total
            var heroID = item[0]
            var times = item[1]
            var winRate = ( dataPersonal.PlayerHeroes[heroID].game_win / dataPersonal.PlayerHeroes[heroID].game_total ).toFixed(2)
            var limit = winRate > 0.5
            return limit?[
                'You played Hero ' + heroID  + ' for' + times + 'times,with the '+ winRate + '% WinRate ',
                '你使用了英雄 ' + heroID + ' 上场了 '+ times + '次，胜率达到了' + winRate + '%',
            ]:false
        }
    ],
    'VengeanceAngel': [
        ['VengeanceAngel', '复仇天使'],
        function () {
            var times_per = ( dataPersonal.PlayerBase.VengeancesPerformed.sum / dataPersonal.PlayerBase.game_total.sum ).toFixed(2)
            var times_glo = ( dataGlobal.PlayerBase.VengeancesPerformed.sum / dataGlobal.PlayerBase.game_total.sum ).toFixed(2)
            var times=dataPersonal.PlayerBase.VengeancesPerformed.sum
            var limit = times_per > times_glo
            return limit?[
                'You have revenge ' + times + ' times, on average '+ times_per + ' times',
                '你复仇了 ' + times + ' 次，平均每场 '+ times_per + ' 次',
            ]:false
        }
    ],
}



// Todo: 排行榜，等待接口支持
var ranking = {}
