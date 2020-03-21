import '@polymer/marked-element';
import { html, PolymerElement } from '@polymer/polymer';
import 'plastic-image';
import { UtilsFunctions } from '../mixins/utils-functions.js';
import './shared-styles.js';
import './text-truncate.js';

class PostsList extends UtilsFunctions(PolymerElement) {
  static get template() {
    return html`
    <style include="shared-styles flex flex-alignment positioning">
      :host {
        display: block;
      }

      .post {
        padding: 24px 0;
        display: block;
        color: var(--primary-text-color);
      }

      .post:not(:last-of-type) {
        border-bottom: 1px dotted var(--divider-color);
      }

      .image {
        margin-right: 24px;
        width: 64px;
        height: 64px;
        border-radius: var(--border-radius);
      }

      .details {
        height: 100%;
      }

      .title {
        line-height: 1.2;
      }

      .description {
        margin-top: 8px;
        color: var(--secondary-text-color)
      }

      .date {
        font-size: 12px;
        text-transform: uppercase;
        color: var(--secondary-text-color);
      }

      @media (min-width: 640px) {
        .image {
          width: 128px;
          height: 128px;
        }
      }

    </style>

    <template is="dom-repeat" items="[[posts]]" as="post">
      <a href$="/blog/posts/[[post.id]]/" class="post" layout horizontal>
        <plastic-image
          class="image"
          srcset="[[post.image]]"
          style$="background-color: [[post.backgroundColor]];"
          sizing="cover"
          hidden$="[[!post.image]]"
          lazy-load
          preload
          fade></plastic-image>
        <div flex>
          <div class="details" layout vertical justified>
            <div>
              <text-truncate lines="2">
                <h2 class="title">[[post.title]]</h2>
              </text-truncate>
              <text-truncate lines="3">
                <marked-element class="description" markdown="[[post.brief]]">
                  <div slot="markdown-html"></div>
                </marked-element>
              </text-truncate>
            </div>
            <span class="date">[[getDate(post.published)]]</span>
          </div>
        </div>
      </a>
    </template>
`;
  }

  static get is() {
    return 'posts-list';
  }

  static get properties() {
    return {
      posts: Array,
    };
  }
}

window.customElements.define(PostsList.is, PostsList);
