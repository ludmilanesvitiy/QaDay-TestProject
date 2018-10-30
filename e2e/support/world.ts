const {setWorldConstructor} = require('cucumber');

export class NameService {
  private currentName: string;
  private featureList = [
    'pagination.feature',
  ];

  constructor() {
    this.createNamesByFeature();
  }

  createNamesByFeature() {
    this.featureList.forEach((name, index) => {
      this.currentName = `CustomName ${index}`;
    });
  }

  getCurrentName() {
    return this.currentName;
  }
}

function World({attach, parameters}) {
  this.nameService = new NameService();
  this.attach = attach;
  this.parameters = parameters;
}

setWorldConstructor(World);
