
//将Level_count等字段中的对象转为数组
var object_to_array=function(object) {
    var arr=[];
    for(var i in Object.keys(object)){
        arr.push(Object.keys(object)[i]);
    }
    return arr;
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
		['Most used', '使用最多的英雄'],
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
        ['QuickMatch Length', '周快速模式时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_QuickMatch.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_QuickMatch_avg_length': [
        ['QuickMatch Avg Length', '周快速模式平均时长'],
       function () {
         var games=dataPersonal.PlayerBase.game_length_QuickMatch.sum
         var length=dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
           return [
               ((games /60)/length).toFixed(0) + "minutes",
               ((games /60)/length).toFixed(0) + "分钟",
           ]
          }
    ],
    //0-4
    'week_HeroLeague_length': [
        ['HeroLeague Length', '周英雄联赛时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_HeroLeague.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_HeroLeague_avg_length': [
        ['HeroLeague Avg Length', '周英雄联赛平均时长'],
      function () {
        var games=dataPersonal.PlayerBase.game_length_HeroLeague.sum/60
          var length=dataPersonal.PlayerBase.game_total_HeroLeague.sum
          return [
              (games/length).toFixed(0) + "minutes",
              (games/length).toFixed(0) + "分钟",
          ]
      }
    ],
    //0-5
    'week_TeamLeague_length': [
        ['TeamLeague Length', '周团队联赛时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_TeamLeague.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_TeamLeague_avg_length': [
        ['TeamLeague Avg Length', '周团队联赛平均时长'],
  function () {
        var games=dataPersonal.PlayerBase.game_length_TeamLeague.sum
      var length=dataPersonal.PlayerBase.game_total_TeamLeague.sum*60
      return [
          (games/length).toFixed(0) + "minutes",
          (games/length).toFixed(0) + "分钟",
      ]
  }
    ],
    //0-6
    'week_UnrankedDraft_length': [
        ['UnrankedDraft Length', '周非排名模式时长'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_length_UnrankedDraft.sum / 60)
            return [
                data + ' minutes',
                data + ' 分钟'
            ]
        }
    ],
    'week_UnrankedDraft_avg_length': [
        ['UnrankedDraft Avg Length', '周非排名模式平均时长'],
    function () {
        var length=dataPersonal.PlayerBase.game_length_UnrankedDraft.sum
        var game=dataPersonal.PlayerBase.game_total_UnrankedDraft.sum*60
        return [
            (length/game).toFixed(0) + "minutes",
            (length/game).toFixed(0) + "分钟",
        ]
    }
    ],
    //0-7
    'WeekQuickMatch_total': [
        ['QuickMatch total', '周快速模式总场次'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_total_QuickMatch.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-8
    'WeekHeroLeague_total': [
        ['HeroLeague total', '周英雄联赛总场次'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_total_HeroLeague.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-9
    'WeekTeamLeague_total': [
        ['TeamLeague total', '周团队联赛总场次'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_total_TeamLeague.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-10
    'WeekUnrankedDraft_total': [
        ['UnrankedDraft total', '非排名模式总场次'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_total_UnrankedDraft.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-11
    'WeekQuickMatch_win': [
        ['QuickMatch win', '周快速模式胜场'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_win_QuickMatch.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-12
    'WeekHeroLeague_win': [
        ['HeroLeague win', '周英雄联赛胜场'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_win_HeroLeague.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-13
    'WeekTeamLeague_win': [
        ['TeamLeague win', '周团队联赛胜场'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_win_TeamLeague.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-14
    'WeekUnrankedDraft_win': [
        ['UnrankedDraft win', '周非排名模式胜场'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.game_win_UnrankedDraft.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //0-winrate
    'WeekQuickMatch_win_rate': [
        ['QuickMatch win rate', '周快速模式胜率'],
       function () {
        var rate=dataPersonal.PlayerBase.game_win_QuickMatch.sum
           var game=dataPersonal.PlayerBase.game_total_QuickMatch.sum
           return [
               (rate/game).toFixed(2) * 100 + "%",
               (rate/game).toFixed(2) * 100 + "%",
           ]
       }
    ],
    'WeekHeroLeague_win_rate': [
        ['HeroLeague win rate', '周英雄联赛胜率'],
        function () {
        var rate=dataPersonal.PlayerBase.game_win_HeroLeague.sum
            var game=dataPersonal.PlayerBase.game_total_HeroLeague.sum
            return [
                (rate/game).toFixed(2) * 100 + "%",
                (rate/game).toFixed(2) * 100 + "%",
            ]
        }
    ],
    'WeekTeamLeague_win_rate': [
        ['TeamLeague win rate', '周团队联赛胜率'],
        function () {
            var rate=dataPersonal.PlayerBase.game_win_TeamLeague.sum
            var game=dataPersonal.PlayerBase.game_total_TeamLeague.sum
            return [
                (rate/game).toFixed(2) * 100 + "%",
                (rate/game).toFixed(2) * 100 + "%",
            ]
        }
    ],
    'WeekUnrankedDraft_win_ate': [
        ['UnrankedDraft win rate', '周非排名模式胜率'],
       function () {
        var rate=dataPersonal.PlayerBase.game_win_UnrankedDraft.sum
           var game=dataPersonal.PlayerBase.game_total_UnrankedDraft.sum
           return [
               (rate/game).toFixed(2) * 100 + "%",
               (rate/game).toFixed(2) * 100 + "%",
           ]
       }
    ],
    //1-1
    'week_party_total': [
        ['Party total', '周开黑次数'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.party_total.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    //1-2
    'week_party_win': [
        ['Party win', '周开黑获胜次数'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.party_win.sum)
            return [
                data + ' times',
                data + ' 局'
            ]
        }
    ],
    'week_party_win_rate': [
        ['Party win rate', '周开黑胜率'],
     function () {
        var rate=dataPersonal.PlayerBase.party_win.sum
         var game=dataPersonal.PlayerBase.party_total.sum
         return [
             (rate/game).toFixed(2) * 100 + "%",
             (rate/game).toFixed(2) * 100 + "%",
         ]
     }
    ],
    'week_team1_count': [
        ['On the right hand', '在右上方的游戏次数'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.team1_count.sum)
            return [
                data + "times",
                data + '次'
            ]
        }
    ],
    'week_level': [
        ['Avg level', '平均等级(游戏结束时)'],
        function () {
        var level=dataPersonal.PlayerBase.Level.sum
            var game=dataPersonal.PlayerBase.game_total.sum
            return [
                (level/game).toFixed(0) + "level",
                (level/game).toFixed(0) + "级",
            ]
        }
    ],
    'week_take_downs': [
        ['Take downs', '参与击杀'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.Takedowns.sum)
            return [
                data + "times",
                data + '次'
            ]
        }
    ],
    'week_solo_kills': [
        ['Solo kills', '最后一击'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.SoloKills.sum)
            return [
                data + "times",
                data + '次'
            ]
        }
    ],
    'week_assists': [
        ['Assists', '助攻'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.Assists.sum)
            return [
                data + "times",
                data + '次'
            ]
        }
    ],
    'week_deaths': [
        ['Deaths', '死亡'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.Deaths.sum)
            return [
                data + "times",
                data + '次'
            ]
        }
    ],
    'week_avg_highest_kill_streak': [
        ['Avg highestKillStreak', '平均最高连杀'],
        function () {
        var avg=dataPersonal.PlayerBase.HighestKillStreak.sum
            var game=dataPersonal.PlayerBase.game_total.sum
            return [
                (avg/game).toFixed(0) + "times",
                (avg/game).toFixed(0) + "次",
            ]
        }
    ],
    'week_max_level': [
        ['Max evel', '最高等级'],
        function () {
            var arr = object_to_array(dataPersonal.PlayerBase.Level_count.max)
            var data = arr[arr.length-1]
            return [
                data + "level",
                data + '级'
            ]
        }
    ],
    'week_min_level': [
        ['Min evel', '最低等级'],
        function () {
           var  arr = object_to_array(dataPersonal.PlayerBase.Level_count.max)
            var data = arr[0]
             data = Math.round(data)
            return [
                data + "level",
                data + '级'
            ]
        }
    ],
    'week_hero_damage': [
        ['HeroDamage', '周英雄总伤害'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.HeroDamage.sum)
            return [
                data + "damage",
                data + '点伤害'
            ]
        }
    ],
    'week_siege_damage': [
        ['SiegeDamage', '周攻城总伤害'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.SiegeDamage.sum)
            return [
                data + "damage",
                data + '点伤害'
            ]
        }
    ],
    'week_structure_damage': [
        ['StructureDamage', '周建筑总伤害'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.StructureDamage.sum)
            return [
                data + "damage",
                data + '点伤害'
            ]
        }
    ],
    'week_minion_damage': [
        ['MinionDamage', '周小兵总伤害'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.MinionDamage.sum)
            return [
                data + "damage",
                data + '点伤害'
            ]
        }
    ],
    //creepdamage
    'week_creep_damage': [
        ['CreepDamage', 'Creep伤害'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.CreepDamage.sum)
            return [
                data + "damage",
                data + '点伤害'
            ]
        }
    ],
    'week_summon_damage': [
        ['SummonDamage', '周召唤物总伤害'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.SummonDamage.sum)
            return [
                data + "damage",
                data + '点伤害'
            ]
        }
    ],
    'week_TimeCCd_enemy_heroes': [
        ['the time of Controlling Enemy Heroes', '控制敌方英雄周时间'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.TimeCCdEnemyHeroes.sum)
            return [
                data + "second",
                data + '秒'
            ]
        }
    ],
    'week_self_healing': [
        ['Self healing', '自我治疗'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.SelfHealing.sum)
            return [
                data + "heal",
                data + '点治疗'
            ]
        }
    ],
    'week_experience_contribution': [
        ['ExperienceContribution', '经验贡献'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.ExperienceContribution.sum)
            return [
                data + "exp",
                data + '点经验'
            ]
        }
    ],
    'week_healing': [
        ['Healing', '治疗'],
        function () {
            var data = Math.round(dataPersonal.PlayerBase.Healing.sum)
            return [
                data + "heal",
                data + '点治疗'
            ]
        }
    ],
    'WeekWinRate': [
        ['Win rate', '周胜率'],
     function () {
        var win=dataPersonal.PlayerBase.game_win.sum
         var games=dataPersonal.PlayerBase.game_total.sum
         return[
             (win/games).toFixed(2) * 100 + "%",
             (win/games).toFixed(2) * 100 + "%",
         ]
     }
    ],
    'MrecCamp': [
        ['MercCamp Captures', '雇佣兵占领次数'],
        function () {
            var times=dataPersonal.PlayerBase.MercCampCaptures.sum
            var games=dataPersonal.PlayerBase.game_total.sum
            return[
                times+"s",
                times+"秒",
            ]
        }
    ],
    'TimeSilencing': [
        ['TimeSilencingEnemyHeroes', '沉默敌人的时间'],
        function () {
            var times=dataPersonal.PlayerBase.TimeSilencingEnemyHeroes.sum
            return[
                times+"s",
                times+"秒",
            ]
        }
    ],
    'TimeRooting': [
        ['TimeRootingEnemyHeroes', '定身敌人的时间'],
        function () {
            var times=dataPersonal.PlayerBase.TimeRootingEnemyHeroes.sum
            return[
                times+"s",
                times+"秒",
            ]
        }
    ],
    'TimeStunning': [
        ['TimeStunningEnemyHeroes', '眩晕敌人的时间'],
        function () {
            var times=dataPersonal.PlayerBase.TimeStunningEnemyHeroes.sum
            return[
                times+"s",
                times+"秒",
            ]
        }
    ],
    'ClutchHealsPerformed': [
        ['ClutchHealsPerformed', '关键治疗次数'],
        function () {
            var times=dataPersonal.PlayerBase.ClutchHealsPerformed.sum
            return[
                times+"times",
                times+"次",
            ]
        }
    ],
    'EscapesPerformed': [
        ['Escapes Performed', '死里逃生次数'],
        function () {
            var times=dataPersonal.PlayerBase.EscapesPerformed.sum
            return[
                times+"times",
                times+"次",
            ]
        }
    ],
    'VengeancesPerformed': [
        ['Vengeances Performed', '复仇次数'],
        function () {
            var times=dataPersonal.PlayerBase.VengeancesPerformed.sum
            return[
                times+"times",
                times+"次",
            ]
        }
    ],
    'TeamfightEscapesPerformed': [
        ['TeamfightEscapes Performed', '团战逃脱的次数'],
        function () {
            var times=dataPersonal.PlayerBase.TeamfightEscapesPerformed.sum
            return[
                times+"times",
                times+"次",
            ]
        }
    ],
    'OutnumberedDeaths': [
        ['Outnumbered Deaths', '被gank的击杀次数'],
        function () {
            var times=dataPersonal.PlayerBase.OutnumberedDeaths.sum
            return[
                times+"times",
                times+"次",
            ]
        }
    ],
    'WinsWarrior': [
        ['WinsWarrior', '前排胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsWarrior.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],
    'WinsAssassin': [
        ['WinsAssassin', '刺杀胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsAssassin.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],
    'WinsSupport': [
        ['WinsAssassin', '治疗胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsAssassin.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],
    'WinsSpecialist': [
        ['WinsSpecialist', '专业胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsSpecialist.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],
    'WinsStarCraft': [
        ['WinsStarCraft', '星际英雄胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsStarCraft.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],
    'WinsDiablo': [
        ['WinsDiablo', '暗黑三英雄胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsDiablo.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],
    'WinsWarcraft': [
        ['WinsWarcraft', '魔兽英雄胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsWarcraft.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],
    'WinsMale': [
        ['WinsMale', '男性英雄胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsSpecialist.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],
    'WinsFemale': [
        ['WinsFemale', '女性英雄胜场'],
        function () {
            var times=dataPersonal.PlayerBase.WinsSpecialist.sum
            return[
                times+"times",
                times+"局",
            ]
        }
    ],

    'GamesOfWarrior': [
        ['Plays Support in this week', '前排英雄周局数'],
        function () {
            var games=Math.round(dataPersonal.PlayerBase.PlaysWarrior.sum)
            return[
                games+'times',
                games+'局'
            ]
        }
    ],
    'GamesOfAssassin': [
        ['Plays Support in this week', '刺杀英雄周局数'],
        function () {
            var games=Math.round(dataPersonal.PlayerBase.PlaysAssassin.sum)
            return[
                games+'times',
                games+'局'
            ]
        }
    ],
    'GamesOfSupport': [
        ['Plays Support in this week', '治疗英雄周局数'],
        function () {
            var games=Math.round(dataPersonal.PlayerBase.PlaysSupport.sum)
            return[
                games+'times',
                games+'局'
            ]
        }
    ],
    'GamesOfSpecialist': [
        ['Plays Specialist in this week', '专业英雄周局数'],
        function () {
            var games=dataPersonal.PlayerBase.PlaysSpecialist.sum
            return[
                games+'times',
                games+'局'
            ]
        }
    ],
    'GamesOfMale': [
        ['Plays Male in this week', '男性英雄周局数'],
        function () {
            var games=dataPersonal.PlayerBase.PlaysMale.sum
            return[
                games+'times',
                games+'局'
            ]
        }
    ],
    'GamesOfFemale': [
        ['Plays Female in this week', '女性英雄周局数'],
        function () {
            var games=dataPersonal.PlayerBase.PlaysFemale.sum
            return[
                games+'times',
                games+'局'
            ]
        }
    ],
    'TimesOfDtagon': [
        ['Take Dragons in this week', '开启龙骑士周次数'],
        function () {
            var games=dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum
            return[
                games+'times',
                games+'次'
            ]
        }
    ],
    'TimesOfDtagonShrines': [
        ['Take Dragons in this week', '占领龙骑士祭坛周次数'],
        function () {
            var games=dataPersonal.PlayerBase.DragonShrinesCaptured.sum
            return[
                games+'times',
                games+'次'
            ]
        }
    ],
    'NumbersOfGardensSeeds': [
        ['Numbers Of GardensSeeds in this week', '收集花园种子周总数'],
        function () {
            var Numbers=dataPersonal.PlayerBase.GardensSeedsCollected.sum
            return[
                Numbers+'Seeds',
                Numbers+'个'
            ]
        }
    ],
    'DamageOfGardensPlant': [
        ['Damage Of GardensSeeds in this week', '恐魔周总伤害量'],
        function () {
            var Numbers=dataPersonal.PlayerBase.GardensPlantDamage.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    'DamageDoneOfAltar': [
        ['Damage Done Of Altar in this week', '占领天空殿祭坛造成的周总伤害量'],
        function () {
            var Numbers=dataPersonal.PlayerBase.AltarDamageDone.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    'DamageToImmortal': [
        ['Damage Done To Immortal in this week', '对不朽者周总伤害量'],
        function () {
            var Numbers=dataPersonal.PlayerBase.DamageDoneToImmortal.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    'GemsTurned': [
        ['Gems Turned In in this week', '上交宝石周总量'],
        function () {
            var Numbers=dataPersonal.PlayerBase.GemsTurnedIn.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    'RavenCollected': [
        ['Raven Tributes Collected in this week', '乌鸦诅咒收集周总量'],
        function () {
            var Numbers=dataPersonal.PlayerBase.RavenTributesCollected.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    'MinesCollected': [
        ['Mines Skulls Collected in this week', '鬼灵矿收集周总量'],
        function () {
            var Numbers=dataPersonal.PlayerBase.MinesSkullsCollected.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    'DoubloonsCollected': [
        ['Black heart Doubloons Collected In in this week', '达布隆币收集周总量'],
        function () {
            var Numbers=dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    'DoubloonsTurnedIn': [
        ['Black heart Doubloons Turned In in this week', '达布隆币上交周总量'],
        function () {
            var Numbers=dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    'TimesInTemple': [
        ['Time In Temple in this week', '天空殿占领祭坛周总时间'],
        function () {
            var Numbers=dataPersonal.PlayerBase.TimeInTemple.sum
            return[
                Numbers+'s',
                Numbers+'s'
            ]
        }
    ],
    'NukeDamage': [
        ['Nuke Damage Done in this week', '核弹头周总伤害'],
        function () {
            var Numbers=dataPersonal.PlayerBase.NukeDamageDone.sum
            return[
                Numbers,
                Numbers
            ]
        }
    ],
    '2_WinRate': [
        ['The WinRate of 2 Premades in this week', '两人开黑胜率'],
        function () {
            var WinRate=(dataPersonal.PlayerBase.party_win_2.sum / dataPersonal.PlayerBase.party_win_2.sum * 100).toFixed(2)
            return[
                WinRate+'%',
                WinRate+'%'
            ]
        }
    ],
    '3_WinRate': [
        ['The WinRate of 3 Premades in this week', '三人开黑胜率'],
        function () {
            var WinRate=(dataPersonal.PlayerBase.party_win_3.sum / dataPersonal.PlayerBase.party_win_3.sum * 100).toFixed(2)
            return[
                WinRate+'%',
                WinRate+'%'
            ]
        }
    ],
    '4_WinRate': [
        ['The WinRate of 4 Premades in this week', '四人开黑胜率'],
        function () {
            var WinRate=(dataPersonal.PlayerBase.party_win_4.sum / dataPersonal.PlayerBase.party_win_4.sum * 100).toFixed(2)
            return[
                WinRate+'%',
                WinRate+'%'
            ]
        }
    ],
    '5_WinRate': [
        ['The WinRate of 5 Premades in this week', '五人开黑胜率'],
        function () {
            var WinRate=(dataPersonal.PlayerBase.party_win_5.sum / dataPersonal.PlayerBase.party_win_5.sum * 100).toFixed(2)
            return[
                WinRate+'%',
                WinRate+'%'
            ]
        }
    ],
    'MapsLength': [
        ['The Length of maps at the end of game', '游戏结束时的地图的总时长'],
        function () {
            var mes=''
            for(var map in dataPersonal.PlayerBase.maps_length.sum) {
                var times = dataPersonal.PlayerBase.maps_length.sum[map]
                var mes=mes+'Map:'+map+' : '+times+'s  '
            }
            return [
                mes ,
                mes
            ]

        }
    ],
    'MapsTimes': [
        ['The Times of maps ', '地图的总次数'],
        function () {
            var mes=''
            for(var map in dataPersonal.PlayerBase.maps_total.sum) {
                var times = dataPersonal.PlayerBase.maps_total.sum[map]
                var mes=mes+'Map:'+map+' : '+times+'  '
            }
            return [
                mes ,
                mes
            ]

        }
    ],
    'MapsWin': [
        ['The Times of maps ', '地图的总总胜场'],
        function () {
            var mes=''
            for(var map in dataPersonal.PlayerBase.maps_win.sum) {
                var times = dataPersonal.PlayerBase.maps_win.sum[map]
                var mes=mes+'Map:'+map+' : '+times+'  '
            }
            return [
                mes ,
                mes
            ]

        }
    ],
    'LevelAchieve': [
        ['The level at the end of game', '游戏结束时的等级'],
        function () {
            var a=''
             for(var level in dataPersonal.PlayerBase.Level_count.max) {
                 var times = dataPersonal.PlayerBase.Level_count.max[level]
               var a=a+'Level'+level+' : '+times+'  '
             }
                return [
                     a ,
                     a
                ]

        }
    ],
    'LastGameTime': [
        ['Last Game Time in this week', '上一次游戏时间'],
        function () {
            var Numbers=timestamptotime(dataPersonal.PlayerBase.last_game_time.max)
            return[
                Numbers,
                Numbers
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
		['Amazing win rate', '令人惊讶的胜率'],
		function () {
			var myWinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
			var globalWinRate = (dataGlobal.PlayerBase.game_win.sum / dataGlobal.PlayerBase.game_total.sum * 100).toFixed(2)
			var limit = myWinRate > 1.2 * globalWinRate
			return limit ?
				[
					'Your win rate(' + myWinRate + '%) is far higher than the global average(' + globalWinRate + '%)',
					'你的胜率(' + myWinRate + '%)远远高于全球平均水平(' + globalWinRate + '%)'
				] : false
		}
	],
    'TheLightOfSupport': [
        ['TheLightOfSupport', '辅助之光'],
        function () {
            var Support=dataPersonal.PlayerBase.PlaysSupport.sum
            var SupportWin=dataPersonal.PlayerBase.WinsSupport.sum
            var gameTotal=dataPersonal.PlayerBase.game_total.sum
            var SupportRate=(Support/gameTotal*100).toFixed(2)
            var SupportWinRate=(SupportWin/Support*100).toFixed(2)
            var limit=SupportRate>0.5
            return limit ?
                [
                    'Last week you have played'+gameTotal+'times in '+SupportRate+' you have played '+Support+' Support with the '+SupportWinRate+' WinRate',
                    '上周你在'+gameTotal+'局里，玩了'+Support+'局辅助，占了总局数的'+SupportRate+'%'+'，您辅助的胜率是'+SupportWinRate
                ] : false
        }
    ],
    'DragonRider': [
        ['DragonRider', '龙骑士'],
        function () {
            var myDragon = (dataPersonal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataPersonal.PlayerBase.maps_total.sum[7]).toFixed(2)
            var globalDragon = (dataGlobal.PlayerBase.DragonNumberOfDragonCaptures.sum / dataGlobal.PlayerBase.maps_total.sum[7]).toFixed(2)
            var limit =myDragon > 2 * globalDragon
            var times = Math.round(myDragon / globalDragon)
            return limit ?
                [
                    'You are a real DragonRider with the ' + times + ' times more than the global average' + globalDragon + 'times',
                    '你开龙的次数是全球平均水平的' + times + '倍呢！真是个名副其实的龙骑士！'
                ] : false
        }
    ],
    'Premades': [
        ['The King of Premades', '开黑小能手'],
        function () {
            var rate_2=(dataPersonal.PlayerBase.party_win_2.sum / dataPersonal.PlayerBase.party_win_2.sum * 100).toFixed(2)
            var rate_3=(dataPersonal.PlayerBase.party_win_3.sum / dataPersonal.PlayerBase.party_win_3.sum * 100).toFixed(2)
            var rate_4=(dataPersonal.PlayerBase.party_win_4.sum / dataPersonal.PlayerBase.party_win_4.sum * 100).toFixed(2)
            var rate_5=(dataPersonal.PlayerBase.party_win_5.sum / dataPersonal.PlayerBase.party_win_5.sum * 100).toFixed(2)
            var limit=rate_2>0.5&&rate_3>0.5&&rate_4>0.5&&rate_5>0.5
            return limit ?
                [
                    'Your WinRate of Premades all beyond 50%,nice teamWork!',
                    '你和好友开黑的胜率都超过了50%，是个名副其实的开黑小能手呢'
                ] : false
        }
    ],
    'Miser': [
        ['Miser', '吝啬鬼'],
        function () {
            var Collected=dataPersonal.PlayerBase.BlackheartDoubloonsCollected.sum
            var TurnedIn=dataPersonal.PlayerBase.BlackheartDoubloonsTurnedIn.sum
            var limit=TurnedIn<0.6*Collected
            return limit ?
                [
                    'In the map of the Black Heart Bay,you collected '+Collected+' Doubloons coins '+', but you only successfully turned in '+TurnedIn+' Doubloons coins, you should look for more opportunities to turn in',
                    '黑心湾地图中，你收集了'+Collected+'个达布隆币'+',但是你只成功上交了'+TurnedIn+'个达布隆币，你应该多寻找机会上交'
                ] : false
        }
    ],
    'UselessRavenTributes': [
        ['UselessRavenTributes', '无用的乌鸦诅咒'],
        function () {
            var Collected=dataPersonal.PlayerBase.RavenTributesCollected.sum
            var Damage=dataPersonal.PlayerBase.CurseDamageDone.sum
            var Collected_gol=dataGlobal.PlayerBase.RavenTributesCollected.sum
            var Damage_gol=dataPersonal.PlayerBase.CurseDamageDone.sum
            var limit=Collected>0.8*Collected_gol&&Damage<0.5*Damage_gol
            return limit ?
                [
                    'In the Curse Valley map, Your curse damage is '+Damage+', and the global average is '+Damage_gol+'. Use the curse time to get the maximum curse damage, such as pushing the line, pushing the tower, etc..',
                    '诅咒谷地图中，你的诅咒伤害是'+Damage+',而全球平均水平是'+Damage_gol+'要善用诅咒时间来获取最大的诅咒伤害，比如跟推吃线、推塔等等。'
                ] : false
        }
    ],
    'PartyWinRate':[
        ['Good bro','好兄弟'],
        function(){
            var myPartyWinRate = (dataPersonal.PlayerBase.party_win.sum / dataPersonal.PlayerBase.party_total.sum * 100).toFixed(2)
            var globalPartyWinRate = (dataGlobal.PlayerBase.party_win.sum / dataGlobal.PlayerBase.party_total.sum * 100).toFixed(2)
            var limit = myPartyWinRate > 1.2 * globalPartyWinRate
            return limit ?
                [
                    "Your party win rate(" + myPartyWinRate + "%) is far higher than the global average(" + globalPartyWinRate + "%)",
                    "你与好友开黑的胜率(" + myPartyWinRate + "%)远远高于全球平均水平(" + globalPartyWinRate + "%)"
                ]:false
        }
    ],
    'HeroDamage':[
        ['Large amount of HeroDamage','大量英雄伤害'],
        function(){
            var myHeroDamage = Math.round(dataPersonal.PlayerBase.HeroDamage.sum)
            var globalHeroDamage = Math.round(dataGlobal.PlayerBase.HeroDamage.sum)
            var limit = myHeroDamage > 1.5 * globalHeroDamage
            return limit ?
                [
                    "Your HeroDamage(" + myHeroDamage + "%) is far higher than the global average(" + globalHeroDamage + "%)",
                    "你英雄伤害(" + myHeroDamage + "%)远远高于全球平均水平(" + globalHeroDamage + "%)"
                ]:false
        }
    ],
    'TownKills':[
        ['TownKills','防御塔击杀'],
        function(){
            var data = Math.round(dataPersonal.PlayerBase.TownKills.sum)
            var limit = data > 5
            return limit ?
                [
                    "You are killed by Town for "+data + "times",
                    "您被防御塔击杀了"+data + "次",
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
                    "You have controlled enemy hero for "+data + "times",
                    "这周你控制了敌方英雄"+data + "秒",
                ]:false
        }
    ],
    'MrecCampMan': [
        ['MercCamp King', '雇佣王'],
        function () {
            var myWinRate = (dataPersonal.PlayerBase.game_win.sum / dataPersonal.PlayerBase.game_total.sum * 100).toFixed(2)
            var times=dataPersonal.PlayerBase.MercCampCaptures.sum
            var games=dataPersonal.PlayerBase.game_total.sum
            var final=times/games
            var limit=final>4&&myWinRate>50
            return limit?[
                " you averaged "+times+" MrecCampCaputers per game. Good occupiedCamp habits have made your winning percentage "+myWinRate,
                "这周你平均每场占领了"+times+"次雇佣兵，良好的开野习惯使你的胜率达到了"+myWinRate,
            ]:false
        }
    ],
}



// Todo: 排行榜，等待接口支持
var ranking = {}
