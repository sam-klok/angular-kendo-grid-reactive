export interface Schema {
    path?: string;
    name: string;

    inlineStyle: boolean;
    inlineTemplate: boolean;
    skipTests: boolean;

    dayView: boolean;
    weekView: boolean;
    monthView: boolean;
    timelineView: boolean;
    agendaView: boolean;
  }
