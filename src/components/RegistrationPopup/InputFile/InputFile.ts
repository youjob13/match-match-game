import BaseControl, { IAttr } from '../../shared/BaseControl/BaseControl';

class InputFile extends BaseControl<HTMLInputElement> {
  constructor(
    propsToBaseControl: {
      tagName: string;
      classes: string[];
      attributes: IAttr;
    },
    private handleInputFile: (dataURL: string, name: string) => void
  ) {
    super(propsToBaseControl);
    this.node.addEventListener('input', (e: any) => {
      const SRC = URL.createObjectURL(e.target.files[0]);
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.height = img.naturalHeight;
          canvas.width = img.naturalWidth;
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpg', 1.0);
          this.handleInputFile(dataURL, this.node.name);
        }
      };
      img.src = SRC;
      if (img.complete || img.complete === undefined) {
        img.src =
          'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        img.src = SRC;
      }
    });
  }
}

export default InputFile;
