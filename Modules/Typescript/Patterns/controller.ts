import { MultipleEuroModel } from './multipleEuroModel';
import { PubSub } from './pubsub';
import { SingleEuroModel } from './singleEuroModel';
import { SlidersView } from './sliders-view';
import { TextInputsView } from './text-inputs-view';
import { createEuroSelectionType, createViewSelectionType } from './user-menu';
import { canvasId, EventEnum, InputInterface } from './utils';

export class Controller {
  private dataList: InputInterface[] = [];

  private isSingle: boolean = true;
  private isTextView: boolean = true;
  private singleEuroModel;
  private multipleEuroModel;

  constructor() {
    this.initAfterDataReceivedFromBE();
  }

  private initAfterDataReceivedFromBE(): void {
    PubSub.sub('data', (result) => {
      this.dataList = result.data;
      
      this.listenForUserSettings();
      this.listenForModelChange();
      
      createEuroSelectionType();
      createViewSelectionType();

      this.prepareCanvas();
      this.singleEuroModel = new SingleEuroModel(this.dataList);
      this.multipleEuroModel = new MultipleEuroModel(this.dataList);
    });
  }

  private listenForUserSettings(): void {
    PubSub.sub(EventEnum.TextInputs, () => {
      setTimeout(() => {
        this.isTextView = true;
        this.prepareCanvas();
        const view = new TextInputsView(this.isSingle);
        view.paint(this.dataList);
        this.initModelService();
      }, 100);
    });

    PubSub.sub(EventEnum.Sliders, () => {
      setTimeout(() => {
        this.isTextView = false;
        this.prepareCanvas();
        const view = new SlidersView(this.isSingle);
        view.paint(this.dataList);
        this.initModelService();
      }, 100);
    });
  }

  private prepareCanvas(): void {
    const currentCanvas = document.getElementById(canvasId);
    // if we already have canvas - remove it, since we are going to repaint it
    if (currentCanvas) {
      currentCanvas.remove();
    }

    const paint = document.createElement('div');
    paint.setAttribute('id', canvasId);
    paint.setAttribute('style', 'border: 4px dotted blue; padding: 15px');
    document.body.append(paint);
  }

  private listenForModelChange(): void {
    PubSub.sub(EventEnum.SingleEuro, () => {
      setTimeout(() => {
        this.multipleEuroModel.stop();
        this.isSingle = true;
        this.reInitView();
      }, 100);
    });

    PubSub.sub(EventEnum.MultipleEuro, () => {
      setTimeout(() => {
        this.singleEuroModel.stop();
        this.isSingle = false;
        this.reInitView();
      }, 100);
    });
  }

  private initModelService(): void {
    if (this.isSingle) {
      this.singleEuroModel.init();
    } else {
      this.multipleEuroModel.init();
    }
  }

  private reInitView(): void {
    if (this.isTextView) {
      PubSub.pub(EventEnum.TextInputs);
    } else {
      PubSub.pub(EventEnum.Sliders);
    }
  }
}