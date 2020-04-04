import '@polymer/iron-icon';
import '@polymer/paper-button';
import { html, PolymerElement } from '@polymer/polymer';
import { ReduxMixin } from '../mixins/redux-mixin.js';
import { uiActions } from '../redux/actions.js';
import './hoverboard-icons.js';
import './shared-animations.js';

class AboutBlock extends ReduxMixin(PolymerElement) {
  static get template() {
    return html`
      <style include="shared-styles flex flex-alignment flex-reverse">
        :host {
          display: block;
        }

        .container {
          padding-top: 64px;
        }

        .content {
          display: grid;
          grid-gap: 32px;
          grid-template-columns: 1fr;
        }

        .statistics-block {
          width: 100%;
          display: grid;
          grid-gap: 32px 16px;
          grid-template-columns: repeat(2, 1fr);
        }

        .numbers {
          font-size: 40px;
        }
      }

    </style>

    <div class="container">

      <div class="content">

        <div>
          <h1 class="container-title">{$ aboutBlock.title $}</h1>
          <p>{$ aboutBlock.callToAction.featuredSessions.description $}</p>
          <ul style="list-style-type:square;">
          <li>{$ aboutBlock.callToAction.featuredSessions.description2 $}</li>
          <li>{$ aboutBlock.callToAction.featuredSessions.description3 $}</li>
          <li>{$ aboutBlock.callToAction.featuredSessions.description4 $}
          <ul>
          <li>{$ aboutBlock.callToAction.featuredSessions.description5 $}</li>
          </ul>
          </li>
          <li>{$ aboutBlock.callToAction.featuredSessions.description6 $}
          <ul>
          <li>{$ aboutBlock.callToAction.featuredSessions.description7 $}</li>
          </ul>
          </li>
          <li>{$ aboutBlock.callToAction.featuredSessions.description8 $}</li>
          </ul>
          <a
            href="{$ aboutBlock.callToAction.featuredSessions.link $}"
            ga-on="click"
            ga-event-category="video"
            ga-event-action="watch"
            ga-event-label="about block - {$ aboutBlock.callToAction.featuredSessions.label $}"
            target="_blank"
            rel="noopener noreferrer">
            <paper-button class="animated icon-right">
              <span class="cta-label">{$ aboutBlock.callToAction.featuredSessions.label $}</span>
              <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
            </paper-button>
          </a>

          <p>{$ aboutBlock.callToAction.howItWas.description $}</p>
          <paper-button
            class="animated icon-right"
            on-tap="_playVideo"
            ga-on="click"
            ga-event-category="video"
            ga-event-action="watch"
            ga-event-label="about block - {$ aboutBlock.callToAction.howItWas.label $}">
            <span>{$  aboutBlock.callToAction.howItWas.label $}</span>
            <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
          </paper-button>
        </div>

        .numbers::after {
          content: '';
          display: block;
          height: 2px;
          width: 64px;
          background-color: var(--default-primary-color);
        }

        .label {
          margin-top: 4px;
        }

        @media (min-width: 640px) {
          .content {
            grid-gap: 64px;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          }

          .statistics-block {
            grid-gap: 32px;
          }

          .numbers {
            font-size: 56px;
          }
        }
      </style>

      <div class="container">
        <div class="content">
          <div>
            <h1 class="container-title">{$ aboutBlock.title $}</h1>
            <p>{$ aboutBlock.callToAction.featuredSessions.description $}</p>
            <a
              href="{$ aboutBlock.callToAction.featuredSessions.link $}"
              ga-on="click"
              ga-event-category="video"
              ga-event-action="watch"
              ga-event-label="about block - {$ aboutBlock.callToAction.featuredSessions.label $}"
              target="_blank"
              rel="noopener noreferrer"
            >
              <paper-button class="animated icon-right">
                <span class="cta-label">{$ aboutBlock.callToAction.featuredSessions.label $}</span>
                <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
              </paper-button>
            </a>

            <p>{$ aboutBlock.callToAction.howItWas.description $}</p>
            <paper-button
              class="animated icon-right"
              on-tap="_playVideo"
              ga-on="click"
              ga-event-category="video"
              ga-event-action="watch"
              ga-event-label="about block - {$ aboutBlock.callToAction.howItWas.label $}"
            >
              <span>{$ aboutBlock.callToAction.howItWas.label $}</span>
              <iron-icon icon="hoverboard:arrow-right-circle"></iron-icon>
            </paper-button>
          </div>

          <div class="statistics-block">
            <div class="item">
              <div class="numbers">
                {$ aboutBlock.statisticsBlock.attendees.number $}
              </div>
              <div class="label">
                {$ aboutBlock.statisticsBlock.attendees.label $}
              </div>
            </div>

            <div class="item">
              <div class="numbers">
                {$ aboutBlock.statisticsBlock.days.number $}
              </div>
              <div class="label">
                {$ aboutBlock.statisticsBlock.days.label $}
              </div>
            </div>

            <div class="item">
              <div class="numbers">
                {$ aboutBlock.statisticsBlock.sessions.number $}
              </div>
              <div class="label">
                {$ aboutBlock.statisticsBlock.sessions.label $}
              </div>
            </div>

            <div class="item">
              <div class="numbers">
                {$ aboutBlock.statisticsBlock.tracks.number $}
              </div>
              <div class="label">
                {$ aboutBlock.statisticsBlock.tracks.label $}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get is() {
    return 'about-block';
  }

  _playVideo() {
    uiActions.toggleVideoDialog({
      title: '{$  aboutBlock.callToAction.howItWas.title $}',
      youtubeId: '{$  aboutBlock.callToAction.howItWas.youtubeId $}',
      disableControls: true,
      opened: true,
    });
  }
}

window.customElements.define(AboutBlock.is, AboutBlock);
