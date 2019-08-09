
var Module = typeof pyodide._module !== 'undefined' ? pyodide._module : {};

Module.checkABI(1);

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'seaborn.data';
    var REMOTE_PACKAGE_BASE = 'seaborn.data';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error("NetworkError for: " + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + " : " + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'lib', true, true);
Module['FS_createPath']('/lib', 'python3.7', true, true);
Module['FS_createPath']('/lib/python3.7', 'site-packages', true, true);
Module['FS_createPath']('/lib/python3.7/site-packages', 'seaborn-0.9.0-py3.7.egg-info', true, true);
Module['FS_createPath']('/lib/python3.7/site-packages', 'seaborn', true, true);
Module['FS_createPath']('/lib/python3.7/site-packages/seaborn', 'colors', true, true);
Module['FS_createPath']('/lib/python3.7/site-packages/seaborn', 'tests', true, true);
Module['FS_createPath']('/lib/python3.7/site-packages/seaborn', 'external', true, true);

    function DataRequest(start, end, audio) {
      this.start = start;
      this.end = end;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);
        this.finish(byteArray);
      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createPreloadedFile'](this.name, null, byteArray, true, true, function() {
          Module['removeRunDependency']('fp ' + that.name);
        }, function() {
          if (that.audio) {
            Module['removeRunDependency']('fp ' + that.name); // workaround for chromium bug 124926 (still no audio with this, but at least we don't hang)
          } else {
            err('Preloading file ' + that.name + ' failed');
          }
        }, false, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change

        this.requests[this.name] = null;
      }
    };

  
    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
          var compressedData = {"data":null,"cachedOffset":474044,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1409,2534,3903,5068,6217,7599,8751,9644,10792,11923,13258,14554,15959,17289,18603,19933,21217,22558,23898,25198,26429,27701,29065,30387,31731,33015,34310,35609,36926,38236,39572,40834,42159,43543,44926,46061,47142,48188,49220,50466,51717,52962,54171,55501,56901,58363,59519,60596,61897,62986,64106,65399,66761,67992,69379,70162,71480,72827,74110,75278,76625,78000,79237,80273,81422,82731,83940,84949,86318,87597,88597,89440,90524,91688,92814,94104,95302,96310,97309,98143,98943,100134,101372,102210,103351,104631,105770,106872,107955,109295,110312,111113,112176,113261,114481,115691,117083,118139,119435,120773,122006,123214,124078,125324,126632,127483,128547,129714,130952,132290,133568,134614,135956,136980,138130,139081,140386,141248,142299,143336,144586,145551,146499,147702,149046,150199,151435,152436,153501,154685,155860,156962,158023,159087,160128,161355,162225,163365,164594,165852,166940,168225,169605,170876,172068,173385,174647,175697,176470,177643,178788,179552,180297,181555,182979,184165,185051,186288,187228,188294,189149,190296,191416,192375,193613,194461,195381,196433,197296,198447,199566,200558,201449,202210,202884,203764,204588,205663,206883,208028,209235,210427,211520,212588,213532,214402,215297,216333,217444,218408,219416,220658,221820,222769,223700,225026,226332,227515,228784,229973,231168,232609,233815,234486,235756,237219,238210,239649,240916,241713,243171,244486,245518,246978,247865,249152,250487,251249,252395,253544,254841,256168,257538,258884,260003,261403,262628,263994,265110,266298,267186,268396,269799,271058,272324,273499,274714,275814,277203,278326,279669,280922,282251,283699,284723,285909,287104,288289,289284,290637,292016,293178,294348,295491,296798,298071,299335,300734,302053,302956,304206,305417,306755,307663,308856,309889,310581,311665,312843,313914,314989,315930,316792,317669,318571,319429,320306,321181,322044,322896,323753,324613,325472,326340,327197,328093,328982,329834,330911,331714,332604,333524,334425,335530,336606,337616,338623,339465,340172,340988,341628,342501,343412,344267,345239,346049,346750,347355,347903,348733,349565,350192,350887,351572,352341,353198,353916,354672,355451,356218,356763,357395,358233,359157,359984,360651,361429,362286,363450,364482,365550,366363,367656,368753,369426,370164,370986,372094,373425,374449,375207,375813,376631,377431,378260,379031,379873,380807,381710,382566,383461,384327,385131,385763,386587,387475,388141,389060,389867,390623,391352,392179,392866,393646,394487,395221,396104,397180,397884,398899,399575,400297,401061,401876,402596,403253,404106,404693,405378,405918,406502,407737,408657,409491,410571,411340,411973,412779,413642,414458,415286,415939,416752,417484,418297,419137,420140,420968,421805,422490,423385,424231,424662,425474,426040,426912,427695,428469,429108,430142,431106,431981,432774,433755,434650,435634,436773,437586,438478,439363,440418,441322,441925,442744,443606,444370,445161,445884,446671,447645,448296,449275,450092,450809,451588,452408,453355,453971,454845,456054,457320,458599,459712,461210,462267,463405,464252,465048,465792,466467,467116,468006,468980,469999,471067,472094,473460],"sizes":[1409,1125,1369,1165,1149,1382,1152,893,1148,1131,1335,1296,1405,1330,1314,1330,1284,1341,1340,1300,1231,1272,1364,1322,1344,1284,1295,1299,1317,1310,1336,1262,1325,1384,1383,1135,1081,1046,1032,1246,1251,1245,1209,1330,1400,1462,1156,1077,1301,1089,1120,1293,1362,1231,1387,783,1318,1347,1283,1168,1347,1375,1237,1036,1149,1309,1209,1009,1369,1279,1000,843,1084,1164,1126,1290,1198,1008,999,834,800,1191,1238,838,1141,1280,1139,1102,1083,1340,1017,801,1063,1085,1220,1210,1392,1056,1296,1338,1233,1208,864,1246,1308,851,1064,1167,1238,1338,1278,1046,1342,1024,1150,951,1305,862,1051,1037,1250,965,948,1203,1344,1153,1236,1001,1065,1184,1175,1102,1061,1064,1041,1227,870,1140,1229,1258,1088,1285,1380,1271,1192,1317,1262,1050,773,1173,1145,764,745,1258,1424,1186,886,1237,940,1066,855,1147,1120,959,1238,848,920,1052,863,1151,1119,992,891,761,674,880,824,1075,1220,1145,1207,1192,1093,1068,944,870,895,1036,1111,964,1008,1242,1162,949,931,1326,1306,1183,1269,1189,1195,1441,1206,671,1270,1463,991,1439,1267,797,1458,1315,1032,1460,887,1287,1335,762,1146,1149,1297,1327,1370,1346,1119,1400,1225,1366,1116,1188,888,1210,1403,1259,1266,1175,1215,1100,1389,1123,1343,1253,1329,1448,1024,1186,1195,1185,995,1353,1379,1162,1170,1143,1307,1273,1264,1399,1319,903,1250,1211,1338,908,1193,1033,692,1084,1178,1071,1075,941,862,877,902,858,877,875,863,852,857,860,859,868,857,896,889,852,1077,803,890,920,901,1105,1076,1010,1007,842,707,816,640,873,911,855,972,810,701,605,548,830,832,627,695,685,769,857,718,756,779,767,545,632,838,924,827,667,778,857,1164,1032,1068,813,1293,1097,673,738,822,1108,1331,1024,758,606,818,800,829,771,842,934,903,856,895,866,804,632,824,888,666,919,807,756,729,827,687,780,841,734,883,1076,704,1015,676,722,764,815,720,657,853,587,685,540,584,1235,920,834,1080,769,633,806,863,816,828,653,813,732,813,840,1003,828,837,685,895,846,431,812,566,872,783,774,639,1034,964,875,793,981,895,984,1139,813,892,885,1055,904,603,819,862,764,791,723,787,974,651,979,817,717,779,820,947,616,874,1209,1266,1279,1113,1498,1057,1138,847,796,744,675,649,890,974,1019,1068,1027,1366,584],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
          compressedData.data = byteArray;
          assert(typeof Module.LZ4 === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
          Module.LZ4.loadPackage({ 'metadata': metadata, 'compressedData': compressedData });
          Module['removeRunDependency']('datafile_seaborn.data');
    
    };
    Module['addRunDependency']('datafile_seaborn.data');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files": [{"filename": "/lib/python3.7/site-packages/seaborn-0.9.0-py3.7.egg-info/PKG-INFO", "start": 0, "end": 2282, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn-0.9.0-py3.7.egg-info/SOURCES.txt", "start": 2282, "end": 3422, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn-0.9.0-py3.7.egg-info/requires.txt", "start": 3422, "end": 3482, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn-0.9.0-py3.7.egg-info/top_level.txt", "start": 3482, "end": 3490, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn-0.9.0-py3.7.egg-info/dependency_links.txt", "start": 3490, "end": 3491, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/conftest.py", "start": 3491, "end": 3711, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/linearmodels.py", "start": 3711, "end": 3854, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/algorithms.py", "start": 3854, "end": 8087, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/rcmod.py", "start": 8087, "end": 24673, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/apionly.py", "start": 24673, "end": 24931, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/cm.py", "start": 24931, "end": 69494, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/regression.py", "start": 69494, "end": 106827, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/utils.py", "start": 106827, "end": 126053, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/axisgrid.py", "start": 126053, "end": 211212, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/__init__.py", "start": 211212, "end": 211715, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/matrix.py", "start": 211715, "end": 258848, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/relational.py", "start": 258848, "end": 321170, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/categorical.py", "start": 321170, "end": 460615, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/miscplot.py", "start": 460615, "end": 461842, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/palettes.py", "start": 461842, "end": 495093, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/timeseries.py", "start": 495093, "end": 511144, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/distributions.py", "start": 511144, "end": 535461, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/widgets.py", "start": 535461, "end": 550777, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/colors/crayons.py", "start": 550777, "end": 555107, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/colors/__init__.py", "start": 555107, "end": 555167, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/colors/xkcd_rgb.py", "start": 555167, "end": 590546, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_miscplot.py", "start": 590546, "end": 591509, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_distributions.py", "start": 591509, "end": 599458, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_algorithms.py", "start": 599458, "end": 603963, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_relational.py", "start": 603963, "end": 661661, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_palettes.py", "start": 661661, "end": 673170, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_rcmod.py", "start": 673170, "end": 681045, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/__init__.py", "start": 681045, "end": 681045, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_utils.py", "start": 681045, "end": 693516, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_categorical.py", "start": 693516, "end": 787566, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_axisgrid.py", "start": 787566, "end": 839164, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_matrix.py", "start": 839164, "end": 880020, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/tests/test_regression.py", "start": 880020, "end": 899944, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/external/husl.py", "start": 899944, "end": 906610, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/external/__init__.py", "start": 906610, "end": 906610, "audio": 0}, {"filename": "/lib/python3.7/site-packages/seaborn/external/six.py", "start": 906610, "end": 936709, "audio": 0}], "remote_package_size": 478140, "package_uuid": "7397c171-1e34-4f03-ad5b-1e2899514bf7"});

})();
