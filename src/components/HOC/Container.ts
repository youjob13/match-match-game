import './container.scss';

import BaseControl from '../shared/BaseControl/BaseControl';

const ContainerWrapper = (node: HTMLElement): HTMLElement => {
  const container = new BaseControl({ tagName: 'div', classes: ['container'] });
  node.append(container.node);
  return container.node;
};

export default ContainerWrapper;
