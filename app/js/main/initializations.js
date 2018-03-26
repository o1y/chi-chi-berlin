
const global = window;
const FOOTER_SCROLL_THRESHOLD = 100;



const selectors = {
    '#page-header-inner' : function(){
        const { offset } = this.dataset;
        const viewport = window;
        const $site = document.documentElement;
        const { documentElement: $pane = $site } = document;  
        const element = document.getElementById('site');
        
        let lastKnownOffset = 0;
        let requestedNewFrame = false;
        
        let scrolled = false;
        let changeHeaderOn = 0;
        let changeFooterOn = $pane.scrollHeight - FOOTER_SCROLL_THRESHOLD;
       
        if( offset === 'viewport' ){
            changeHeaderOn = global.innerHeight;
        }else{
            const offsetNumber = parseInt( offset, 10 );
            if( offsetNumber + '' !== 'NaN' ){
                changeHeaderOn = offsetNumber;
            }
        }
        changeHeaderOn = changeHeaderOn - 84;
        
        const scrollPage = ()=>{
            const currentScrollingPosition = isScrollingVertical();
            
            if( changeHeaderOn > 0 ){
                if ( currentScrollingPosition >= changeHeaderOn ) {
                    element.dataset.state_header = 'untouched';
                }else{
                    element.dataset.state_header = 'changed';
                }                
            }

            if ( currentScrollingPosition + global.innerHeight >= changeFooterOn ) {
                element.dataset.state_footer = 'visible';
            }else{
                element.dataset.state_footer = 'invisible';
            }
            
            scrolled = false;
        };
        
        const isScrollingVertical = ()=>{
            if( lastKnownOffset > 0 ){
                return lastKnownOffset;
            }else{
                return $site.scrollTop;
            }
        };
        
        viewport.addEventListener( 'scroll', function( event ) {
            
            lastKnownOffset = viewport.scrollY;
            if( requestedNewFrame === false ){          
                global.requestAnimationFrame(function() {
            
                    if( scrolled === false) {
                        scrolled = true;
                        global.setTimeout( scrollPage, 150 );
                    }
                    
                    requestedNewFrame = false;
                });
                requestedNewFrame = true;
            }
            
        }, false );
        
        scrollPage();
    },
    

    '#insurance-fee-calculator': function(){
        const element = this;
        const { PPIT, jQuery } = global;
        
        if( typeof PPIT === 'undefined' ){ return; }
        
        const cb = () => {
            const select = element.querySelector( '.wgt-select-type0 select' );
            jQuery( select ).val( '0' ).change();
        };
        
        const hideLoader_original = PPIT.RT.prototype.hideLoader;
        PPIT.RT.prototype.hideLoader = function hideLoader(){
            const args = arguments;
            const self = this;
            
            cb();
            
            hideLoader_original.call( self, ...args );
        };
        
        const rtInstance = new PPIT.RT({
            appId: '31d68559-31cf-4794-8ddd-1f93d6bd635c',
            target: `#${ element.id }`,
            ns: 'insurance-fee-calculator',
            iframe: false,
            inittab: 1
        });
    },
    
    
    '#page-aside-nav[data-state="open"]': function(){
        const element = this;
        
        global.setTimeout(()=>{
            element.dataset.state = 'closed';
        }, 1200 );
    },
    
    
    '.component__image-gallery': function(){
        const element = this;
        const { jQuery } = global;
        
        if( typeof jQuery === 'undefined' ){
            return console.log( 'jquery not available' );
        }
        
        const controls = element.querySelector( '.controls' );
        const viewport = element.querySelector( '.viewport' );

        jQuery( viewport ).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: controls,
            dots: true
        });
        jQuery( controls ).slick({
            initialSlide: 0,
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: viewport,
            centerMode: false,
            focusOnSelect: true,
            arrows: true,
            infinite: false,
            variableWidth: true,
            draggable: false
       });
    },
    
    
    '#store-location': function(){
        const element = this;
        const { L: leaflet } = global;
        
        const COORDINATES = [
            52.4809994,             // lat
            13.425803200000018      // lng
        ];
        const popupContents = `
            <div class="ll__popup-content">
                <img src="/media/images/assets/logo_small_black.svg" alt="CHICHI Logo">
                <div class="contact-info">
                    <h3>Fahrradgeschäft</h3>
                    <address>
                        Flughafenstr. 50<br>
                        12053 Berlin
                    </address>
                </div>
            </div>
        `;
        const ZOOM = 15;
        const MAP_PROVIDER_NAME = 'Thunderforest.OpenCycleMap';
        
        
        const provider = leaflet.tileLayer.provider( 
            MAP_PROVIDER_NAME,
            {
                apikey: 'edc8a89afa764f77ae70e47c50359b4f'
            }
        );
        
        const icon = leaflet.icon({
            iconUrl: '/media/images/assets/icon_marker.svg',
            iconSize: [ 28, 42 ],
            iconAnchor: [ 14, 42 ],
            popupAnchor: [ 0, -40 ]
        });
        
        const marker = leaflet.marker( COORDINATES, { icon } );
        
        const popup = leaflet.popup({
            maxWidth: 300,
            minWidth: 250
        });
        popup.setContent( popupContents );
        
        const map = leaflet.map( element ).setView( COORDINATES, ZOOM );
        provider.addTo( map );
        marker.addTo( map )
            .bindPopup( popup )
            .openPopup();

    }
};



export { selectors as default };
