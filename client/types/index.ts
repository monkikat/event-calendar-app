export interface CalendarMonth {
    name: string;
    index: number;
    days: Day[]
};

export interface Day {
    date: number;
    dayOfWeek: number;
    fullDate: string;
}

export interface EventTM {
    id: string;
    name: string;
    dates: {
      start: { localDate: string;
        localTime?: string; };
    };
    url: string;
  };
