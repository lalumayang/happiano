/*
  https://codepen.io/anon/pen/YvmZYE
*/
//soundpack定義一包一包的資料，給audio用，包含number：音符號碼跟url：音檔來源
var soundpack=[];
//推一包一包的資料進去，這邊會提供audio做渲染
var soundpack_index = []; 

var soundpack_index_mapping=[];

soundpack_index_mapping["1"]    = 1;
soundpack_index_mapping["1.5"]  = 2;
soundpack_index_mapping["2"]    = 3;

soundpack_index_mapping["3"]    = 4;
soundpack_index_mapping["3.5"]  = 5;
soundpack_index_mapping["4"]    = 6;
soundpack_index_mapping["4.5"]  = 7;
soundpack_index_mapping["5"]    = 8;
soundpack_index_mapping["6"]    = 9;
soundpack_index_mapping["6.5"]  = 10;
soundpack_index_mapping["7"]    = 11;
soundpack_index_mapping["7.5"]  = 12;
soundpack_index_mapping["8"]    = 13;
soundpack_index_mapping["8.5"]  = 14;
soundpack_index_mapping["9"]    = 15;

soundpack_index_mapping["10"]    = 16;
soundpack_index_mapping["10.5"]  = 17;
soundpack_index_mapping["11"]    = 18;
soundpack_index_mapping["11.5"]  = 19;
soundpack_index_mapping["12"]    = 20;
soundpack_index_mapping["13"]    = 21;
soundpack_index_mapping["13.5"]  = 22;
soundpack_index_mapping["14"]    = 23;
soundpack_index_mapping["14.5"]  = 24;
soundpack_index_mapping["15"]    = 25;
soundpack_index_mapping["15.5"]  = 26;
soundpack_index_mapping["16"]    = 27;

soundpack_index_mapping["17"]   = 28;
soundpack_index_mapping["17.5"] = 29;
soundpack_index_mapping["18"]   = 30;
soundpack_index_mapping["18.5"] = 31;
soundpack_index_mapping["19"]   = 32;
soundpack_index_mapping["20"]   = 33;
soundpack_index_mapping["20.5"] = 34;
soundpack_index_mapping["21"]   = 35;
soundpack_index_mapping["21.5"] = 36;
soundpack_index_mapping["22"]   = 37;
soundpack_index_mapping["22.5"] = 38;
soundpack_index_mapping["23"]   = 39;

soundpack_index_mapping["24"]   = 40;
soundpack_index_mapping["24.5"] = 41;
soundpack_index_mapping["25"]   = 42;
soundpack_index_mapping["25.5"] = 43;
soundpack_index_mapping["26"]   = 44;
soundpack_index_mapping["27"]   = 45;
soundpack_index_mapping["27.5"] = 46;
soundpack_index_mapping["28"]   = 47;
soundpack_index_mapping["28.5"] = 48;
soundpack_index_mapping["29"]   = 49;
soundpack_index_mapping["29.5"] = 50;
soundpack_index_mapping["30"]   = 51;

soundpack_index_mapping["31"]   = 52;
soundpack_index_mapping["31.5"] = 53;
soundpack_index_mapping["32"]   = 54;
soundpack_index_mapping["32.5"] = 55;
soundpack_index_mapping["33"]   = 56;
soundpack_index_mapping["34"]   = 57;
soundpack_index_mapping["34.5"] = 58;
soundpack_index_mapping["35"]   = 59;
soundpack_index_mapping["35.5"] = 60;
soundpack_index_mapping["36"]   = 61;
soundpack_index_mapping["36.5"] = 62;
soundpack_index_mapping["37"]   = 63;

soundpack_index_mapping["38"]   = 64;
soundpack_index_mapping["38.5"] = 65;
soundpack_index_mapping["39"]   = 66;
soundpack_index_mapping["39.5"] = 67;
soundpack_index_mapping["40"]   = 68;
soundpack_index_mapping["41"]   = 69;
soundpack_index_mapping["41.5"] = 70;
soundpack_index_mapping["42"]   = 71;
soundpack_index_mapping["42.5"] = 72;
soundpack_index_mapping["43"]   = 73;
soundpack_index_mapping["43.5"] = 74;
soundpack_index_mapping["44"]   = 75;

soundpack_index_mapping["45"]   = 76;
soundpack_index_mapping["45.5"] = 77;
soundpack_index_mapping["46"]   = 78;
soundpack_index_mapping["46.5"] = 79;
soundpack_index_mapping["47"]   = 80;
soundpack_index_mapping["48"]   = 81;
soundpack_index_mapping["48.5"] = 82;
soundpack_index_mapping["49"]   = 83;
soundpack_index_mapping["49.5"] = 84;
soundpack_index_mapping["50"]   = 85;
soundpack_index_mapping["50.5"] = 86;
soundpack_index_mapping["51"]   = 87;

soundpack_index_mapping["52"]   = 88;

//抓到audio中data-num=id的那個聲音DOM物件
for(var i=1; i<=52; i+=0.5){
  soundpack_index[i] = i;
  var s = "./pianosound_mp3/"+ i + ".mp3";
  soundpack.push({
    number: i,
    url: s,
  });
  // console.log(s);
}

var vm = new Vue({
  el: "#app",
  data: {
    sounddata: soundpack,
    notes: [{"num":24,"time":343},{"num":1,"time":265},{"num":5,"time":380},{"num":5,"time":501},{"num":6,"time":625},{"num":6,"time":748},{"num":5,"time":871},{"num":4,"time":1126},{"num":4,"time":1247},{"num":3,"time":1365},{"num":3,"time":1477},{"num":2,"time":1597},{"num":2,"time":1714},{"num":1,"time":1837}],

    now_note_id: 0,//播放到哪裡
    next_note_id: 0,
    playing_time: 0,
    record_time: 0,
    now_press_key: -1,
    player: null,
    recorder: null,
    display_keys:[
      {num: 1,   key: 32  ,type:'white'},
      {num: 1.5, key: 33  ,type:'black'},
      {num: 2,   key: 34  ,type:'white'},

      {num: 3,   key: 35  ,type:'white'},
      {num: 3.5, key: 36  ,type:'black'},
      {num: 4,   key: 37  ,type:'white'},
      {num: 4.5, key: 38  ,type:'black'}, 
      {num: 5,   key: 39  ,type:'white'},
      {num: 6,   key: 40  ,type:'white'},
      {num: 6.5, key: 41  ,type:'black'},
      {num: 7,   key: 42  ,type:'white'},
      {num: 7.5, key: 43  ,type:'black'},
      {num: 8,   key: 44  ,type:'white'},
      {num: 8.5, key: 45  ,type:'black'},
      {num: 9,   key: 46  ,type:'white'},

      {num: 10,   key: 47  ,type:'white'},
      {num: 10.5, key: 48  ,type:'black'},
      {num: 11,   key: 49  ,type:'white'},
      {num: 11.5, key: 50  ,type:'black'},
      {num: 12,   key: 51  ,type:'white'},
      {num: 13,   key: 52  ,type:'white'},
      {num: 13.5, key: 53  ,type:'black'},
      {num: 14,   key: 54  ,type:'white'},
      {num: 14.5, key: 55  ,type:'black'},
      {num: 15,   key: 56  ,type:'white'},
      {num: 15.5, key: 57  ,type:'black'},
      {num: 16,   key: 58  ,type:'white'},

      {num: 17,   key: 59  ,type:'white'},
      {num: 17.5, key: 60  ,type:'black'},
      {num: 18,   key: 61  ,type:'white'},
      {num: 18.5, key: 62  ,type:'black'},
      {num: 19,   key: 63  ,type:'white'},
      {num: 20,   key: 64  ,type:'white'},
      {num: 20.5, key: 65  ,type:'black'},
      {num: 21,   key: 66  ,type:'white'},
      {num: 21.5, key: 67  ,type:'black'},
      {num: 22,   key: 68  ,type:'white'},
      {num: 22.5, key: 69  ,type:'black'},
      {num: 23,   key: 70  ,type:'white'},
 
      {num: 24,   key: 71  ,type:'white'},
      {num: 24.5, key: 72  ,type:'black'},
      {num: 25,   key: 73  ,type:'white'},
      {num: 25.5, key: 74  ,type:'black'},
      {num: 26,   key: 75  ,type:'white'},
      {num: 27,   key: 76  ,type:'white'},
      {num: 27.5, key: 77  ,type:'black'},
      {num: 28,   key: 78  ,type:'white'},
      {num: 28.5, key: 79  ,type:'black'},
      {num: 29,   key: 80  ,type:'white'},
      {num: 29.5, key: 81  ,type:'black'},
      {num: 30,   key: 82  ,type:'white'},
 
      {num: 31,   key: 83  ,type:'white'},
      {num: 31.5, key: 84  ,type:'black'},
      {num: 32,   key: 85  ,type:'white'},
      {num: 32.5, key: 86  ,type:'black'},
      {num: 33,   key: 87  ,type:'white'},
      {num: 34,   key: 88  ,type:'white'},
      {num: 34.5, key: 89  ,type:'black'},
      {num: 35,   key: 90  ,type:'white'},
      {num: 35.5, key: 91  ,type:'black'},
      {num: 36,   key: 92  ,type:'white'},
      {num: 36.5, key: 93  ,type:'black'},
      {num: 37,   key: 94  ,type:'white'},

      {num: 38,   key: 95  ,type:'white'},
      {num: 38.5, key: 96  ,type:'black'},
      {num: 39,   key: 97  ,type:'white'},
      {num: 39.5, key: 98  ,type:'black'},
      {num: 40,   key: 99  ,type:'white'},
      {num: 41,   key:100  ,type:'white'},
      {num: 41.5, key:101  ,type:'black'},
      {num: 42,   key:102  ,type:'white'},
      {num: 42.5, key:103  ,type:'black'},
      {num: 43,   key:104  ,type:'white'},
      {num: 43.5, key:105  ,type:'black'},
      {num: 44,   key:106  ,type:'white'},
 
      {num: 45,   key:107  ,type:'white'},
      {num: 45.5, key:108  ,type:'black'},
      {num: 46,   key:109  ,type:'white'},
      {num: 46.5, key:110  ,type:'black'},
      {num: 47,   key:111  ,type:'white'},
      {num: 48,   key:112  ,type:'white'},
      {num: 48.5, key:113  ,type:'black'},
      {num: 49,   key:114  ,type:'white'},
      {num: 49.5, key:115  ,type:'black'},
      {num: 50,   key:116  ,type:'white'},
      {num: 50.5, key:117  ,type:'black'},
      {num: 51,   key:118  ,type:'white'},

      {num: 52,   key:119  ,type:'white'}
    ]
  },
  methods: {
    //播放音符，附上id音符號碼|Volume（0-1）音量
    playnote: function(id,volume){
      if (id>0){
				var audio_obj=$("audio[data-num='"+id+"']")[0];
        audio_obj.volume=volume;//調整音量
        audio_obj.currentTime=0;//倒帶到頭
        audio_obj.play();//播放音樂
      }
    },
    playnext: function(volume){
      //從notes裡面抓出第now_note_id筆資料
      var play_note=this.notes[this.now_note_id].num;
      // console.log('play_note = ' + play_note);
			play_note = soundpack_index_mapping[play_note.toString()];
      this.playnote(play_note,volume);//播放音符（引數音符號碼、音量）
			this.now_note_id+=1;//把現在正在播放的音符位置移動到下一個

      //如果現在位置移動完超出了樂譜的長度
      if (this.now_note_id>=this.notes.length){
        this.stopplay();//停止播放
      }
    },
     //開始錄音
    start_record: function(){
      this.record_time=0;//重置錄音時間
      //定義一個新的計時器，控制錄製時間+1
      this.recorder=setInterval(function(){
        vm.record_time++;
      })
    },
    //停止錄音
    stop_record: function(){
      //清除計時器
      clearInterval(this.recorder);
      //重置錄製時間
      this.record_time=0;
      
    },
    //開始播放
    startplay: function(){
      this.now_note_id=0;//現在指向的音符位置=0
      this.playing_time=0;//歸零現在播放時間
      this.next_note_id=0;//下一個音符=0
      var vobj=this;//用與在setInterval能夠存取this，運用vobj當變數裝他
      //播放的計時器
      this.player=setInterval(function(){
        //如果現在播放時間>下一個音符的時間的話
        if (vobj.playing_time>=vobj.notes[vobj.next_note_id].time){
          //播放下一個音符，下一個音符的index+=1
          vobj.playnext(1);
          vobj.next_note_id++;
        }
        //播放時間+1
        vobj.playing_time++;
      },2);
    },
    //結束播放
    stopplay: function(){
      //清除正在驅動的player計時器
      clearInterval(this.player);
      this.now_note_id=0;//現在指向的音符位置為0 
      this.next_note_id=0;//歸零現在播放時間
      this.playing_time=0;//下一個音符為0
    },
    //傳入音符id，看現在是否正在播放他，有的回傳true，沒有回傳false
    get_current_highlight: function(id,skey){
      //console.log('id = ' + id + ', skey = ' + skey);
      //如果譜沒有長度就直接跳出去
      if (this.playing_time==0)
        return false;
      if (this.now_press_key===skey)
        return true;
      if (this.notes.length==0)
        return false
      //cur-id上一個播放的音符ID
      var cur_id=this.now_note_id-1;
      //如果cur-id《0會發生錯誤，歸零
      if (cur_id<0) cur_id=0;
      //取得現在的播放音符
      var num=this.notes[cur_id].num;
      //如果播放與傳進來的音符一樣，傳true，否則執行到最後回傳false
			
			//顯示播放音符位置
			//error
			if ((num)==id){
				// console.log('num = '+(num) +' id = '+(id));
				return true;
			}
			return false;
			//error


    },
    //加入音符到樂譜（如果現在正在錄製中），播放
    addnote: function(id){
      //如果正在錄製中(錄製時間>0)，就推一個音符資料(音符號碼/播放時間)進去樂譜
      // console.log('id = ' + id);

      if (this.record_time>0)
        this.notes.push({num: id,time: this.record_time});
         //播放這音樂
      this.playnote(id,1);
    },
    load_sample: function(){
      var vobj=this;
      $.ajax({
        url: "https://awiclass.monoame.com/api/command.php?type=get&name=music_dodoro",
        //url: "./music_dodoro.json",
        success: function(res){
          vobj.notes=JSON.parse(res);
        }
      });
    }
  }
});
//如果按下鍵盤
$(window).keydown(function(e){
  var key = e.which; //它是事件參數的那一個屬性（抓到傳進來事件資料的鍵盤代號）
  vm.now_press_key=key;//設定vue裡面正在按的鍵，顯示用
  console.log('key = ' + key);
  //從鍵盤清單裡面尋找，如果有對應到key值一樣的，就播放/加入譜那個音
  for(var i=0;i<vm.display_keys.length;i++){
    if (key==vm.display_keys[i].key){
      vm.addnote(vm.display_keys[i].num)
    }
  }
});
//如果離開鍵盤
$(window).keyup(function(){
  vm.now_press_key=-1; //設定vue裡面正在按的鍵為-1，清空
});
