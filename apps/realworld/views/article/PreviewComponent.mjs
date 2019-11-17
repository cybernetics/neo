import {default as Component} from '../../../../src/component/Base.mjs';
import {default as VDomUtil}  from '../../../../src/util/VDom.mjs';

/**
 * @class RealWorld.views.article.PreviewComponent
 * @extends Neo.component.Base
 */
class PreviewComponent extends Component {
    static getConfig() {return {
        /**
         * @member {String} className='RealWorld.views.article.PreviewComponent'
         * @private
         */
        className: 'RealWorld.views.article.PreviewComponent',
        /**
         * @member {String} ntype='realworld-article-previewcomponent'
         * @private
         */
        ntype: 'realworld-article-previewcomponent',
        /**
         * @member {String|null} author_=null
         */
        author_: null,
        /**
         * @member {String[]} cls=['article-preview']
         */
        cls: ['article-preview'],
        /**
         * ISO 8601 timestamp
         * @member {String|null} createdAt_=null
         */
        createdAt_: null,
        /**
         * @member {String|null} description_=null
         */
        description_: null,
        /**
         * @member {Number|null} favoritesCount_=null
         */
        favoritesCount_: null,
        /**
         * @member {String|null} slug_=null
         */
        slug_: null,
        /**
         * @member {Array|null} tagList_=null
         */
        tagList_: null,
        /**
         * @member {String|null} title_=null
         */
        title_: null,
        /**
         * @member {String|null} userImage_=null
         */
        userImage_: null,
        /**
         * @member {Object} _vdom
         */
        _vdom: {
            cn: [{
                cls: ['article-meta'],
                cn : [{
                    tag : 'a',
                    flag: 'userImageLink',
                    cn  : [{tag: 'img'}]
                }, {
                    cls: ['info'],
                    cn : [
                        {tag : 'a',    cls : ['author'], flag: 'author'},
                        {tag : 'span', cls : ['date'],   flag: 'createdAt'}
                    ]
                }, {
                    tag: 'button',
                    cls: ['btn', 'btn-outline-primary', 'btn-sm', 'pull-xs-right'],
                    cn : [
                        {tag  : 'i',    cls : ['ion-heart']},
                        {vtype: 'text', flag: 'favoritesCount'}
                    ]
                }]
            }, {
                tag : 'a',
                cls : ['preview-link'],
                flag: 'preview-link',
                cn  : [
                    {tag : 'h1',   flag: 'title'},
                    {tag : 'p',    flag: 'description'},
                    {tag : 'span', html: 'Read more...'}
                ]
            }]
        }
    }}

    /**
     * Tiggered after the author config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetAuthor(value, oldValue) {
        let vdom = this.vdom,
            node = VDomUtil.getByFlag(vdom, 'author'),
            href = '#/profile/' + value;

        node.href = href;
        node.html = value;

        VDomUtil.getByFlag(vdom, 'userImageLink').href = href;

        this.vdom = vdom;
    }

    /**
     * Tiggered after the createdAt config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetCreatedAt(value, oldValue) {
        let vdom = this.vdom;

        VDomUtil.getByFlag(vdom, 'createdAt').html = new Intl.DateTimeFormat('en-US', {
            day  : 'numeric',
            month: 'long',
            year : 'numeric'
        }).format(new Date(value));

        this.vdom = vdom;
    }

    /**
     * Tiggered after the description config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetDescription(value, oldValue) {
        let vdom = this.vdom;

        VDomUtil.getByFlag(vdom, 'description').html = value;
        this.vdom = vdom;
    }

    /**
     * Tiggered after the favoritesCount config got changed
     * @param {Number} value
     * @param {Number} oldValue
     * @private
     */
    afterSetFavoritesCount(value, oldValue) {
        let vdom = this.vdom;

        VDomUtil.getByFlag(vdom, 'favoritesCount').html = ' ' + value;
        this.vdom = vdom;
    }

    /**
     * Tiggered after the slug config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetSlug(value, oldValue) {
        let vdom = this.vdom;

        VDomUtil.getByFlag(vdom, 'preview-link').href = '#/article/' + value;
        this.vdom = vdom;
    }

    /**
     * Tiggered after the tagList config got changed
     * @param {Array} value
     * @param {Array} oldValue
     * @private
     */
    afterSetTagList(value, oldValue) {
        let me   = this,
            vdom = me.vdom,
            tagList;

        if (Array.isArray(value) && value.length > 0) {
            tagList = {
                tag: 'ul',
                cls: ['tag-list'],
                cn : []
            };

            value.forEach(item => {
                tagList.cn.push({
                    tag : 'li',
                    cls : ['tag-default', 'tag-pill', 'tag-outline'],
                    html: item
                })
            });

            vdom.cn[1].cn.push(tagList);

            me.vdom = vdom;
        }
    }

    /**
     * Tiggered after the title config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetTitle(value, oldValue) {
        let vdom = this.vdom;

        VDomUtil.getByFlag(vdom, 'title').html = value;
        this.vdom = vdom;
    }

    /**
     * Tiggered after the userImage config got changed
     * @param {String} value
     * @param {String} oldValue
     * @private
     */
    afterSetUserImage(value, oldValue) {
        let vdom = this.vdom;

        VDomUtil.getByFlag(vdom, 'userImageLink').cn[0].src = value;
        this.vdom = vdom;
    }
}

Neo.applyClassConfig(PreviewComponent);

export {PreviewComponent as default};