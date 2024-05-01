interface MenuPoints {
  /** Ключ. */
  key: number | string;
  /** Поле меню. */
  label: string;
}

export const menuPoints: MenuPoints[] = [
  {
    key: '/leaderboard',
    label: 'Турнирная таблица',
  },
];
