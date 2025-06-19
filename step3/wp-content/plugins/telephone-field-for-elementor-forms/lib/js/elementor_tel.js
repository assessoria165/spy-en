( function( $ ) {
        "use strict";
        jQuery(document).ready(function($) {
                setTimeout(function(){ 
                        $(".elementor").not(".elementor-location-popup").each(function(e){
                    $( "input.elementor-field-telephone", $(this) ).each(function( index ) {
                        elementor_field_telephone($(this));
                    });
                }) 
                 }, 200);
        jQuery( document ).on( 'elementor/popup/show', () => {
             $( "input.elementor-field-telephone" ).each(function( index ) {
                    elementor_field_telephone($(this));
            });
        } );
                $("input").on("done_load_repeater",function(e){
                        $( "input.elementor-field-telephone" ).each(function( index ) {
                                        elementor_field_telephone($(this));
                        });
                })
                function elementor_field_telephone(field){
                        var onlyCountries_data = field.data("onlyct");
                        var exclude = field.data("excludecountries");
                        var preferredCountries_data = field.data("pre");
                        var geoIpLookup_data = field.data("auto");
                        var countrySearch = field.data("telephone_search");
                        var initialCountry_data = field.data("defcountry");
                        var input = "form_fields["+field.data("name")+"]";
                        //field.attr('name',"form_fields[]");
                        if(countrySearch == "yes"){
                                countrySearch = true;
                        }else{
                                countrySearch = false;
                        }
                        var data = [];
                        if (onlyCountries_data == "") { 
                                // Se não houver países especificados, use todos os países disponíveis
                                if (typeof allCountryCodes !== 'undefined') {
                                    console.log("Usando lista completa de países: " + allCountryCodes.length + " países");
                                    onlyCountries_data = allCountryCodes;
                                } else {
                                    console.log("Lista completa de países não encontrada, usando padrão");
                                    onlyCountries_data = [];
                                }
                        }else{
                                onlyCountries_data = onlyCountries_data.split('|');
                        }
                        if (exclude == "") { 
                                exclude = [];
                        }else{
                                exclude = exclude.split('|');
                        }
                        if (preferredCountries_data == "") { 
                                preferredCountries_data = [ "us", "gb", "ca", "au", "br" ];
                        }else{
                                preferredCountries_data = preferredCountries_data.split('|');
                        }
                        if (initialCountry_data == "") { 
                                initialCountry_data = "auto";
                        }
                        if( field.data("auto") == "yes" ){
                                var iti = field.intlTelInput({
                                        nationalMode: true,
                                        countrySearch: countrySearch,
                                        onlyCountries: onlyCountries_data,
                                        excludeCountries: exclude,
                                        initialCountry: initialCountry_data,
                                        preferredCountries: preferredCountries_data,
                                        utilsScript: elementor_tel.utilsScript,
                                        separateDialCode: true,
                                        hiddenInput: () => ({ phone: input}),
                                        geoIpLookup: function(success, failure) {
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

                                            // Método 1: ipinfo.io (principal) - sem solicitar permissão
                                            function tryIpInfoAPI() {
                                                console.log("Tentando ipinfo.io (método passivo sem solicitar permissão)");
                                                // Usar apenas AJAX direto para obter localização por IP
                                                // CORS para JSONP para evitar problemas de bloqueio
                                                $.get("https://ipinfo.io", function() {}, "jsonp")
                                                .done(function(resp) {
                                                    var countryCode = (resp && resp.country) ? resp.country : "";
                                                    if (countryCode) {
                                                        console.log("Geolocalização via ipinfo.io: " + countryCode);
                                                        countryCode = countryCode.toLowerCase();
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
                                            
                                            // Método 2: ip-api.com (alternativa otimizada para Android)
                                            function tryIpApiCom() {
                                                console.log("Tentando ip-api.com (optimizado para Android)");
                                                // Usar o fetch API que é melhor suportado em Android
                                                try {
                                                    fetch('https://ip-api.com/json/')
                                                        .then(function(response) {
                                                            if (!response.ok) {
                                                                throw new Error('Resposta de rede não foi ok');
                                                            }
                                                            return response.json();
                                                        })
                                                        .then(function(data) {
                                                            if (data && data.countryCode) {
                                                                console.log("Geolocalização via ip-api.com: " + data.countryCode);
                                                                var code = data.countryCode.toLowerCase();
                                                                saveCountryToCache(code);
                                                                success(code);
                                                            } else {
                                                                console.log("Sem código de país, tentando método alternativo");
                                                                tryGeoPlugin();
                                                            }
                                                        })
                                                        .catch(function(error) {
                                                            console.log("Erro no fetch: " + error.message);
                                                            tryGeoPlugin();
                                                        });
                                                } catch (e) {
                                                    console.log("Erro ao tentar fetch: " + e.message);
                                                    // Fallback para o método antigo com AJAX em caso de erro
                                                    $.ajax({
                                                        url: 'https://ip-api.com/json/',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        timeout: 5000, // Timeout menor para falhar mais rápido
                                                        success: function(data) {
                                                            if (data && data.countryCode) {
                                                                console.log("Geolocalização via ip-api.com (ajax): " + data.countryCode);
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
                                            }
                                            
                                            // Método 3: geoplugin.net (terceira alternativa otimizada para Android)
                                            function tryGeoPlugin() {
                                                console.log("Tentando geoplugin.net (otimizado para Android)");
                                                try {
                                                    // Usando fetch API primário para Android
                                                    fetch('https://www.geoplugin.net/json.gp')
                                                        .then(function(response) {
                                                            if (!response.ok) {
                                                                throw new Error('Resposta de rede não foi ok');
                                                            }
                                                            return response.json();
                                                        })
                                                        .then(function(data) {
                                                            if (data && data.geoplugin_countryCode) {
                                                                console.log("Geolocalização via geoplugin: " + data.geoplugin_countryCode);
                                                                var code = data.geoplugin_countryCode.toLowerCase();
                                                                saveCountryToCache(code);
                                                                success(code);
                                                            } else {
                                                                // Método 4: Tenta identificar pelo idioma do navegador
                                                                tryNavigatorLanguageFallback();
                                                            }
                                                        })
                                                        .catch(function(error) {
                                                            console.log("Erro no fetch geoplugin: " + error.message);
                                                            // Método 4: Tenta identificar pelo idioma do navegador
                                                            tryNavigatorLanguageFallback();
                                                        });
                                                } catch (e) {
                                                    console.log("Erro ao tentar fetch geoplugin: " + e.message);
                                                    // Fallback para ajax em caso de erro
                                                    $.ajax({
                                                        url: 'https://www.geoplugin.net/json.gp',
                                                        type: 'GET',
                                                        dataType: 'json',
                                                        timeout: 5000, // Timeout menor
                                                        success: function(data) {
                                                            if (data && data.geoplugin_countryCode) {
                                                                console.log("Geolocalização via geoplugin (ajax): " + data.geoplugin_countryCode);
                                                                var code = data.geoplugin_countryCode.toLowerCase();
                                                                saveCountryToCache(code);
                                                                success(code);
                                                            } else {
                                                                // Método 4: Tenta identificar pelo idioma do navegador
                                                                tryNavigatorLanguageFallback();
                                                            }
                                                        },
                                                        error: function() {
                                                            // Método 4: Tenta identificar pelo idioma do navegador
                                                            tryNavigatorLanguageFallback();
                                                        }
                                                    });
                                                }
                                            }
                                            
                                            // Método 4: Fallback baseado no idioma (especialmente para Android)
                                            function tryNavigatorLanguageFallback() {
                                                console.log("Tentando identificar país pelo idioma do navegador");
                                                try {
                                                    var language = navigator.language || navigator.userLanguage;
                                                    console.log("Idioma do navegador: " + language);
                                                    
                                                    // Mapeamento de idiomas comuns para códigos de país
                                                    var languageMap = {
                                                        'en': 'us',   // Inglês > EUA
                                                        'en-us': 'us',
                                                        'en-gb': 'gb', // Inglês (UK)
                                                        'en-ca': 'ca', // Inglês (Canadá)
                                                        'en-au': 'au', // Inglês (Austrália)
                                                        'pt': 'br',   // Português > Brasil
                                                        'pt-br': 'br',
                                                        'pt-pt': 'pt', // Português (Portugal)
                                                        'es': 'es',   // Espanhol > Espanha
                                                        'es-mx': 'mx', // Espanhol (México)
                                                        'es-ar': 'ar', // Espanhol (Argentina)
                                                        'fr': 'fr',   // Francês > França
                                                        'fr-ca': 'ca', // Francês (Canadá)
                                                        'de': 'de',   // Alemão > Alemanha
                                                        'it': 'it',   // Italiano > Itália
                                                        'ru': 'ru',   // Russo > Rússia
                                                        'zh': 'cn',   // Chinês > China
                                                        'zh-cn': 'cn',
                                                        'zh-tw': 'tw', // Chinês (Taiwan)
                                                        'ja': 'jp',   // Japonês > Japão
                                                        'ko': 'kr',   // Coreano > Coreia do Sul
                                                        'ar': 'sa',   // Árabe > Arábia Saudita
                                                        'hi': 'in',   // Hindi > Índia
                                                        'tr': 'tr',   // Turco > Turquia
                                                        'nl': 'nl',   // Holandês > Holanda
                                                        'sv': 'se',   // Sueco > Suécia
                                                        'pl': 'pl',   // Polonês > Polônia
                                                        'vi': 'vn'    // Vietnamita > Vietnã
                                                    };
                                                    
                                                    // Tentar com o código de idioma completo primeiro
                                                    var code = languageMap[language.toLowerCase()];
                                                    
                                                    // Se não encontrou, tentar com apenas o primeiro código de idioma
                                                    if (!code && language.indexOf('-') > 0) {
                                                        var primaryLanguage = language.split('-')[0].toLowerCase();
                                                        code = languageMap[primaryLanguage];
                                                    }
                                                    
                                                    if (code) {
                                                        console.log("País identificado pelo idioma: " + code);
                                                        saveCountryToCache(code);
                                                        success(code);
                                                        return;
                                                    }
                                                    
                                                    // Último recurso - usar padrão
                                                    console.log("Não foi possível identificar o país pelo idioma, usando padrão: us");
                                                    saveCountryToCache('us');
                                                    success('us');
                                                } catch (e) {
                                                    console.log("Erro ao tentar identificar pelo idioma: " + e.message);
                                                    saveCountryToCache('us');
                                                    success('us');
                                                }
                                            }

                                            // Iniciar com o primeiro método
                                            tryIpInfoAPI();
                                         },
                                });     
                        }else{
                                var iti = field.intlTelInput({
                                        countrySearch: countrySearch,
                                        onlyCountries: onlyCountries_data,
                                        excludeCountries: exclude,
                                        initialCountry: initialCountry_data,
                                        preferredCountries: preferredCountries_data,
                                        utilsScript: elementor_tel.utilsScript,
                                        separateDialCode: true,
                                        hiddenInput: () => ({ phone: input})
                                });
                        }
                }
                // phon us
                $("body").on('keypress','.elementor-field-telephone-us', function(e) {
                          var key = e.charCode || e.keyCode || 0;
                          var phone = $(this);
                          if (phone.val().length === 0) {
                            phone.val(phone.val() + '(');
                          }
                          // Auto-format- do not expose the mask as the user begins to type
                          if (key !== 8 && key !== 9) {
                            if (phone.val().length === 4) {
                              phone.val(phone.val() + ')');
                            }
                            if (phone.val().length === 5) {
                              phone.val(phone.val() + ' ');
                            }
                            if (phone.val().length === 9) {
                              phone.val(phone.val() + '-');
                            }
                            if (phone.val().length >= 14) {
                              phone.val(phone.val().slice(0, 13));
                            }
                          }

                          // Allow numeric (and tab, backspace, delete) keys only
                          return (key == 8 ||
                            key == 9 ||
                            key == 46 ||
                            (key >= 48 && key <= 57) ||
                            (key >= 96 && key <= 105));
                        })

                        .on('focus', function() {
                         var phone = $(this);

                          if (phone.val().length === 0) {
                            phone.val('(');
                          } else {
                            var val = phone.val();
                            phone.val('').val(val); // Ensure cursor remains at the end
                          }
                        })

                        .on('blur', function() {
                          var $phone = $(this);

                          if ($phone.val() === '(') {
                            $phone.val('');
                          }
                });

        $("body").on("change",".elementor-field-telephone",function(){
                var content = $.trim($(this).val());
                var check_field = $(this).closest('.elementor-field-type-telephone').find('.phone_check');
                var number = $(this).intlTelInput("getNumber");
                $(this).next().attr("value",number);
                $(this).next().val(number);
                if( $(this).data("validation") == "yes" && content.length > 0 ) {
                        var number = $(this).intlTelInput("getNumber");
                        if ($(this).intlTelInput("isValidNumber")) { 
                                check_field.attr("value","yes");
                                check_field.val("yes");
                                $(this).addClass('wpcf7-not-valid-blue').removeClass('wpcf7-not-valid-red').removeClass('wpcf7-not-valid');     
                        }else{
                                check_field.attr("value","no");
                                check_field.val("no");
                                $(this).addClass('wpcf7-not-valid-red').removeClass('wpcf7-not-valid-blue');
                        }
                }
        })
        $( ".elementor-field-telephone" ).keyup(function( event ) {
                var check_field = $(this).closest('.elementor-field-type-telephone').find('.phone_check');
                var content = $.trim($(this).val());
                if( $(this).data("validation") == "yes"  ) {
                        if ($(this).intlTelInput("isValidNumber")) { 
                                check_field.attr("value","yes");
                                check_field.val("yes");
                                $(this).addClass('wpcf7-not-valid-blue').removeClass('wpcf7-not-valid-red').removeClass('wpcf7-not-valid');     
                        }else{
                                check_field.attr("value","no");
                                check_field.val("no");
                                $(this).addClass('wpcf7-not-valid-red').removeClass('wpcf7-not-valid-blue');
                        }
                }
        }).keydown(function( event ) {
          
        });
        $("body").on("focus",".elementor-field-telephone",function(){
                $(this).removeClass('wpcf7-not-valid-blue').removeClass('wpcf7-not-valid-red');
        })
                document.addEventListener("countrychange", function() {
                  $("input.elementor-field-telephone").change();
                });
        })
} )( jQuery );
