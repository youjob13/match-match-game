import './container.scss';
import BaseControl from '../BaseControl/BaseControl';

const ContainerWrapper = (node: HTMLElement): HTMLElement => {
  const container = new BaseControl<HTMLElement>({
    tagName: 'div',
    classes: ['container'],
  });
  node.append(container.node);
  return container.node;
};

export default ContainerWrapper;
