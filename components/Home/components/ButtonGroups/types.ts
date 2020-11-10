export type LinkButton = {
  name: string;
  link: string;
};

export interface ButtonGroup {
  name: string;
  items: (ButtonGroup | LinkButton)[];
}
