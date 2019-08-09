
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
    var PACKAGE_NAME = 'cutadapt.data';
    var REMOTE_PACKAGE_BASE = 'cutadapt.data';
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
Module['FS_createPath']('/lib/python3.7/site-packages', 'cutadapt-2.4-py3.7.egg-info', true, true);
Module['FS_createPath']('/lib/python3.7/site-packages', 'cutadapt', true, true);
Module['FS_createPath']('/', 'bin', true, true);

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
      
          var compressedData = {"data":null,"cachedOffset":201180,"cachedIndexes":[-1,-1],"cachedChunks":[null,null],"offsets":[0,1331,2640,3971,4921,5758,6612,7472,8773,10003,11297,12342,13266,14176,15323,16935,18552,19900,21214,22313,23503,24681,25822,26927,27965,29140,30268,31127,32219,33408,34451,35585,36634,38034,39200,40605,41557,42570,43561,44601,45715,46752,47836,48780,49797,51030,52108,53123,54337,55525,56769,57988,59122,60258,61366,62412,63373,64570,65428,66378,67297,68515,69635,70654,71334,72332,73651,75029,76179,77393,78360,79158,79921,80704,81699,82497,83233,84168,84933,85688,86534,87088,87898,88918,89363,89635,90333,90853,91434,91787,92434,93020,94093,94848,95853,96721,97348,98242,99042,99689,100513,101596,102383,103423,104076,104562,105493,106194,107002,107656,108310,109157,109890,111118,111644,112542,113667,114463,114980,115673,116756,117514,118102,118823,119550,120513,121365,122041,122834,123221,123797,124626,125701,126164,126664,127496,128201,128729,129382,130104,130917,131494,132457,132824,133398,133929,134380,135131,136193,137114,137800,138138,138887,139989,140681,141891,142784,143308,144342,145153,145908,146631,147310,148089,148646,149419,150238,150885,151906,152512,153428,154263,154822,155977,157247,158237,159219,160295,160889,161467,161933,163144,164149,164885,166313,167670,169144,170299,171740,172770,173493,174735,175742,176807,177745,179025,180172,181244,182298,183187,184244,185250,186319,187606,188837,189984,191066,192342,193440,194549,195818,196895,198111,199184,200339],"sizes":[1331,1309,1331,950,837,854,860,1301,1230,1294,1045,924,910,1147,1612,1617,1348,1314,1099,1190,1178,1141,1105,1038,1175,1128,859,1092,1189,1043,1134,1049,1400,1166,1405,952,1013,991,1040,1114,1037,1084,944,1017,1233,1078,1015,1214,1188,1244,1219,1134,1136,1108,1046,961,1197,858,950,919,1218,1120,1019,680,998,1319,1378,1150,1214,967,798,763,783,995,798,736,935,765,755,846,554,810,1020,445,272,698,520,581,353,647,586,1073,755,1005,868,627,894,800,647,824,1083,787,1040,653,486,931,701,808,654,654,847,733,1228,526,898,1125,796,517,693,1083,758,588,721,727,963,852,676,793,387,576,829,1075,463,500,832,705,528,653,722,813,577,963,367,574,531,451,751,1062,921,686,338,749,1102,692,1210,893,524,1034,811,755,723,679,779,557,773,819,647,1021,606,916,835,559,1155,1270,990,982,1076,594,578,466,1211,1005,736,1428,1357,1474,1155,1441,1030,723,1242,1007,1065,938,1280,1147,1072,1054,889,1057,1006,1069,1287,1231,1147,1082,1276,1098,1109,1269,1077,1216,1073,1155,841],"successes":[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
;
          compressedData.data = byteArray;
          assert(typeof Module.LZ4 === 'object', 'LZ4 not present - was your app build with  -s LZ4=1  ?');
          Module.LZ4.loadPackage({ 'metadata': metadata, 'compressedData': compressedData });
          Module['removeRunDependency']('datafile_cutadapt.data');
    
    };
    Module['addRunDependency']('datafile_cutadapt.data');
  
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
 loadPackage({"files": [{"filename": "/lib/python3.7/site-packages/cutadapt-2.4-py3.7.egg-info/PKG-INFO", "start": 0, "end": 2829, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt-2.4-py3.7.egg-info/SOURCES.txt", "start": 2829, "end": 3358, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt-2.4-py3.7.egg-info/requires.txt", "start": 3358, "end": 3439, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt-2.4-py3.7.egg-info/top_level.txt", "start": 3439, "end": 3448, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt-2.4-py3.7.egg-info/entry_points.txt", "start": 3448, "end": 3501, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt-2.4-py3.7.egg-info/dependency_links.txt", "start": 3501, "end": 3502, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/qualtrim.so", "start": 3502, "end": 30147, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/__main__.py", "start": 30147, "end": 70534, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/pipeline.py", "start": 70534, "end": 97854, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/_version.py", "start": 97854, "end": 97968, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/utils.py", "start": 97968, "end": 101512, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/modifiers.py", "start": 101512, "end": 115854, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/report.py", "start": 115854, "end": 133565, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/__init__.py", "start": 133565, "end": 133610, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/align.py", "start": 133610, "end": 135377, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/_align.so", "start": 135377, "end": 383643, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/filters.py", "start": 383643, "end": 397690, "audio": 0}, {"filename": "/lib/python3.7/site-packages/cutadapt/adapters.py", "start": 397690, "end": 439231, "audio": 0}, {"filename": "/bin/cutadapt", "start": 439231, "end": 439687, "audio": 0}], "remote_package_size": 205276, "package_uuid": "fc2fdec2-6212-41e9-8578-9b607e102e2d"});

})();
