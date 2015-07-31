(function(window) {
    var Slider = function() {


        this.init = function(config) {
            var domNode = config.domNode;

            var dom = config.dom = {
                images: domNode.querySelector('.slider__images'),
                imagesWrap: domNode.querySelector('.slider__images-wrap'),
                prev: domNode.querySelector('.slider__pager_prev'),
                next: domNode.querySelector('.slider__pager_next'),
                pagination: domNode.querySelector('.slider__pagination')
            };

            config.current = config.current || 0;

            config.count = dom.imagesWrap.children.length;

            config.width = dom.images.offsetWidth;

            dom.imagesWrap.style.marginLeft = -(config.current * config.width) + 'px';

            this.config = config;
        };

        this.__slideRight = function() {
            var config = this.config,
                style = config.dom.imagesWrap.style;

            if (config.current === config.count - 1) {
                style.marginLeft = '0px';
                config.current = 0;
            } else {
                style.marginLeft = (parseInt(style.marginLeft, 10) - config.width) + 'px';
                config.current += 1;
            }
            this.__updatePager();
        };

        this.__slideLeft = function() {
            var config = this.config,
                style = config.dom.imagesWrap.style;

            if (config.current === 0) {
                style.marginLeft = -((config.count - 1) * config.width) + 'px';
                config.current = config.count - 1;
            } else {
                style.marginLeft = (parseInt(style.marginLeft, 10) + config.width) + 'px';
                config.current -= 1;
            }
            this.__updatePager();
        };

        this.__selectPage = function(elem) {
            var config = this.config,
                style = config.dom.imagesWrap.style,
                id = +elem.dataset['slider__item'];

            style.marginLeft = -(config.width * id) + 'px';
            config.current = id;

            this.__updatePager();
        };

        this.__updatePager = function() {
            var pagination = this.config.dom.pagination;

            pagination.querySelector('.active').classList.remove('active');

            pagination.getElementsByTagName('a')[this.config.current].classList.add('active');
        };

    };

    window.Slider = new Slider();
})(window);