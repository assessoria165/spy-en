// Função de geolocalização aprimorada para multi-plataforma
function geoIpLookupMultiPlatform(success, failure) {
    // Verificar se já temos um país em cache
    var countryCodeCache = sessionStorage.getItem('country_code_cache');
    var cacheTimestamp = sessionStorage.getItem('country_code_timestamp');
    var cacheValid = false;
    
    // Verificar se o cache ainda é válido (menos de 24 horas)
    if (countryCodeCache && cacheTimestamp) {
        var now = new Date().getTime();
        var cacheTime = parseInt(cacheTimestamp);
        var cacheDuration = 24 * 60 * 60 * 1000; // 24 horas em ms
        
        if (now - cacheTime < cacheDuration) {
            cacheValid = true;
        }
    }
    
    // Se tivermos um cache válido, usar imediatamente
    if (cacheValid && countryCodeCache) {
        console.log("Usando país em cache: " + countryCodeCache);
        success(countryCodeCache);
        return;
    }

    // Função para salvar o código do país no cache
    function saveCountryToCache(code) {
        if (code) {
            sessionStorage.setItem('country_code_cache', code);
            sessionStorage.setItem('country_code_timestamp', new Date().getTime());
        }
    }

    // Método 1: ipinfo.io (principal)
    function tryIpInfoAPI() {
        console.log("Tentando ipinfo.io");
        jQuery.get("https://ipinfo.io", function() {}, "jsonp")
        .done(function(resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            if (countryCode) {
                console.log("Geolocalização via ipinfo.io: " + countryCode);
                saveCountryToCache(countryCode);
                success(countryCode);
            } else {
                tryIpApiCom();
            }
        })
        .fail(function() {
            tryIpApiCom();
        });
    }
    
    // Método 2: ip-api.com (alternativa para Android)
    function tryIpApiCom() {
        console.log("Tentando ip-api.com");
        jQuery.ajax({
            url: 'https://ip-api.com/json/',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data && data.countryCode) {
                    console.log("Geolocalização via ip-api.com: " + data.countryCode);
                    var code = data.countryCode.toLowerCase();
                    saveCountryToCache(code);
                    success(code);
                } else {
                    tryGeoPlugin();
                }
            },
            error: function() {
                tryGeoPlugin();
            }
        });
    }
    
    // Método 3: geoplugin.net (terceira alternativa)
    function tryGeoPlugin() {
        console.log("Tentando geoplugin.net");
        jQuery.ajax({
            url: 'https://www.geoplugin.net/json.gp',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data && data.geoplugin_countryCode) {
                    console.log("Geolocalização via geoplugin: " + data.geoplugin_countryCode);
                    var code = data.geoplugin_countryCode.toLowerCase();
                    saveCountryToCache(code);
                    success(code);
                } else {
                    // Falha em todos os métodos - usar padrão (EUA)
                    console.log("Geolocalização falhou, usando padrão: us");
                    saveCountryToCache('us');
                    success('us');
                }
            },
            error: function() {
                // Falha em todos os métodos - usar padrão (EUA)
                console.log("Geolocalização falhou, usando padrão: us");
                saveCountryToCache('us');
                success('us');
            }
        });
    }

    // Iniciar com o primeiro método
    tryIpInfoAPI();
}
