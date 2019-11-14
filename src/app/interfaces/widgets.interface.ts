export interface RuleGroup {
  subject: string;
  description: string;
}

export interface Widget {
  name: string;
  inputs?: any;
  registeredToShow?: boolean;
}
