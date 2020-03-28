import '@polymer/iron-location/iron-location.js';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin.js';
import { UtilsFunctions } from '../mixins/utils-functions.js';
import './content-loader.js';
import './shared-styles.js';

class HeaderBottomToolbar extends UtilsFunctions(ReduxMixin(PolymerElement)) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment positioning">
        :host {
          display: block;
          background-color: var(--primary-background-color);
        }

        app-toolbar {
          margin: 0 auto;
          padding: 0 16px;
          height: auto;
          max-width: var(--max-container-width);
        }

        .nav-items {
          --paper-tabs-selection-bar-color: var(--default-primary-color);
          --paper-tabs: {
            height: 64px;
          }
          width: 100%;
        }

        .nav-item a {
          padding: 0 14px;
          color: var(--primary-text-color);
        }

        @media (min-width: 640px) {
          app-toolbar {
            padding: 0 36px;
          }
        }
      </style>

      <iron-location query="{{queryParams}}"></iron-location>

      <app-toolbar class="bottom-toolbar">
        <content-loader
          class="nav-items"
          card-padding="15px"
          card-width="105px"
          card-margin="0 14px 0 0"
          card-height="64px"
          avatar-size="0"
          avatar-circle="0"
          title-top-position="20px"
          title-height="24px"
          title-width="75%"
          load-from="-240%"
          load-to="350%"
          blur-width="80px"
          items-count="{$ contentLoaders.schedule.itemsCount $}"
          layout
          horizontal
          hidden$="[[contentLoaderVisibility]]"
        >
        </content-loader>

        <paper-tabs
          class="nav-items"
          selected="[[route.subRoute]]"
          attr-for-selected="day"
          hidden$="[[!contentLoaderVisibility]]"
          scrollable
          hide-scroll-buttons
          noink
        >
          <template is="dom-repeat" items="[[schedule]]" as="day">
            <paper-tab class="nav-item" day="[[day.date]]" link>
              <a href$="[[_addQueryParams(day.date, queryParams)]]" layout vertical center-center
                >[[day.dateReadable]]</a
              >
            </paper-tab>
          </template>
          <paper-tab class="nav-item" day="my-schedule" hidden$="[[!user.signedIn]]" link>
            <a href$="[[_addQueryParams('my-schedule', queryParams)]]" layout vertical center-center
              >{$ mySchedule.title $}</a
            >
          </paper-tab>
        </paper-tabs>
      </app-toolbar>
    `;
  }

  static get is() {
    return 'header-bottom-toolbar';
  }

  static get properties() {
    return {
      route: {
        type: String,
      },
      schedule: {
        type: Array,
      },
      contentLoaderVisibility: {
        type: Boolean,
        value: false,
      },
      user: {
        type: Object,
      },
    };
  }

  static mapStateToProps(state, _element) {
    return {
      route: state.routing,
      schedule: state.schedule,
      user: state.user,
    };
  }

  static get observers() {
    return ['_scheduleChanged(schedule)'];
  }

  connectedCallback() {
    super.connectedCallback();
    HOVERBOARD.Elements.StickyHeaderToolbar = this;
  }

  _scheduleChanged(schedule) {
    if (schedule.length) {
      this.contentLoaderVisibility = true;
    }
  }

  _addQueryParams(tab, queryParams) {
    return `/schedule/${tab}${queryParams ? `?${queryParams}` : ''}`;
  }
}

customElements.define(HeaderBottomToolbar.is, HeaderBottomToolbar);
