class ImageLoader {
    constructor(element) {
        this.wrapper = element;
        this.width = element.getBoundingClientRect().width;
        this.height = element.getBoundingClientRect().height;
        this.src = element.dataset.src;
        this.mouseOn = false;
        this.animated = false;

        this.app = new PIXI.Application(this.width, this.height, { transparent: true });
        this.wrapper.append(this.app.view);
        this.container = new PIXI.Container();
        this.app.stage.addChild(this.container);

        this.load(this.startAnimation.bind(this));
    }

    load(afterLoad) {
        let tmpImg = new Image();
        tmpImg.src = this.src;
        tmpImg.addEventListener('load', () => {
            afterLoad();
        });
    }

    startAnimation() {
        const that = this;
        // create pixi image and add it to container
        this.bg = PIXI.Sprite.fromImage(this.src);
        this.bg.width = this.width;
        this.bg.height = this.height;
        this.bg.position.x = 0;
        this.bg.position.y = 0;
        this.container.addChild(this.bg);
        // create filter
        this.displacementSprite = PIXI.Sprite.fromImage('./images/displacement-img01.jpg');
        this.displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT; // cover with filter all image
        this.displacementFilter = new PIXI.filters.DisplacementFilter(this.displacementSprite);
        // set filter scale
        this.displacementFilter.scale.set(1e4 + Math.random() * 1000);
        this.displacementSprite.scale.set(0.4 + 0.6 * Math.random());
        // add filter to container & stage (for waves effect on hover)
        this.app.stage.addChild(this.displacementSprite);
        this.container.filters = [this.displacementFilter];

        // this.click();

        // animate displacementFilter on image
        let tl = new TimelineMax({ onComplete: function () { that.animated = true; } });
        tl.to(that.displacementFilter.scale, 1, { x: 1, y: 1 });

        this.hover();
    }

    click() {
        let that = this;
        this.wrapper.addEventListener('click', () => {
            let tl = new TimelineMax(
                { onComplete: function () { that.animated = true; } }
            );
            tl.to(that.displacementFilter.scale, 1, { x: 1, y: 1 });
        });
    }

    hover() {
        let that = this;

        this.wrapper.addEventListener('mouseenter', function () {
            if (!that.mouseOn && that.animated) {
                that.mouseOn = true;
                TweenMax.ticker.addEventListener('tick', that.doWaves, that); // same as requestAnimationFrame
                let tl = new TimelineMax();
                tl.to(that.displacementFilter.scale, 0.5, { x: 16, y: 4 });
            }
        });

        this.wrapper.addEventListener('mouseleave', function () {
            if (that.mouseOn && that.animated) {
                that.mouseOn = false;
                TweenMax.ticker.removeEventListener('tick', that.doWaves, that);
                let tl = new TimelineMax();
                tl.to(that.displacementFilter.scale, 0.5, { x: 1, y: 1 });
            }
        });
    }

    doWaves() {
        this.displacementSprite.x += 1;
    }
}

const imageNodeList = document.querySelectorAll('.section__image');
Array.prototype.forEach.call(imageNodeList, function (node) {
    const img = new ImageLoader(node);
});