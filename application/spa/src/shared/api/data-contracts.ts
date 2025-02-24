/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CustomTokenObtainPair {
    username: string;
    password: string;
    access?: string;
    refresh?: string;
    user_id?: number;
}

/** Сериализатор для лидерборда */
export interface Leaderboard {
    first_name?: string;
    last_name?: string;
    username: string;
    total_points: number;
}

/** Сериализатор для лидерборда по задаче */
export interface LeaderboardProblem {
    /** Сериализатор для модель соревнования */
    problem: ProblemWithImageURL;
    items: Leaderboard[];
}

/** Сериализатор для лидерборда по задаче */
export interface LeaderboardTournament {
    /** Сериализатор для модели Соревнование */
    tournament: Tournament;
    items: Leaderboard[];
}

/** Сериализатор для модель соревнования */
export interface PatchedProblem {
    id?: number;
    users?: User[];
    /** @maxLength 300 */
    title?: string;
    /** @maxLength 1000 */
    description?: string | null;
    /** * `webots_ros2_suv` - webots_ros2_suv */
    world_path?: WorldPathEnum;
    /** @format uri */
    image?: string | null;
    /** @format double */
    difficulty?: number;
    author?: number;
}

/** Сериализатор для модели Соревнование-Пользователь (многие ко многим) */
export interface PatchedProblemUser {
    id?: number;
    records?: string;
    /**
     * @min -2147483648
     * @max 2147483647
     */
    points?: number;
    robot_panel_port?: number;
    vs_port?: number;
    webots_stream_port?: number;
    grades?: any;
    launch_command?: string;
    /**
     * * `CREATED` - Создана
     * * `IN_PROGRESS` - В процессе
     * * `COMPLETED` - Завершена
     * * `QUARANTINE` - В карантине
     * * `CHECKED` - Проверена
     * * `REWORK` - Отправлена на доработку
     */
    status?: StatusEnum;
    user?: number;
    problem?: number;
    tournament?: number;
}

/** Сериализатор для модели Соревнование */
export interface PatchedTournament {
    id?: number;
    users?: User[];
    users_ids?: number[];
    /** @maxLength 150 */
    name?: string;
    /** @maxLength 5000 */
    description?: string;
    /** @format date-time */
    date_start?: Date;
    /** @format date-time */
    date_end?: Date;
    is_blocked?: boolean;
    problems?: number[];
}

/** Сериализатор для модель many-to-many Соревнования-Пользователи */
export interface PatchedTournamentUser {
    id?: number;
    is_completed?: boolean;
    /**
     * @min -2147483648
     * @max 2147483647
     */
    points?: number;
    user?: number;
    tournament?: number;
}

export interface PatchedUser {
    id?: number;
    groups?: string;
    /** @maxLength 128 */
    password?: string;
    /**
     * Superuser status
     * Designates that this user has all permissions without explicitly assigning them.
     */
    is_superuser?: boolean;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @maxLength 150
     * @pattern ^[\w.@+-]+$
     */
    username?: string;
    /** @maxLength 150 */
    first_name?: string;
    /** @maxLength 150 */
    last_name?: string;
    /**
     * Email address
     * @format email
     * @maxLength 254
     */
    email?: string;
    /**
     * Номер телефона
     * @maxLength 18
     */
    phone?: string | null;
    /** @maxLength 50 */
    telegram?: string | null;
    /**
     * Название организации
     * @maxLength 150
     */
    organization?: string | null;
    /**
     * Название команды
     * @maxLength 50
     */
    team?: string | null;
}

/** Сериализатор для модель соревнования */
export interface Problem {
    id: number;
    users: User[];
    /** @maxLength 300 */
    title: string;
    /** @maxLength 1000 */
    description?: string | null;
    /** * `webots_ros2_suv` - webots_ros2_suv */
    world_path: WorldPathEnum;
    /** @format uri */
    image?: string | null;
    /** @format double */
    difficulty: number;
    author: number;
}

/** Сериализатор для модели Соревнование-Пользователь (многие ко многим) */
export interface ProblemUser {
    id: number;
    records: string;
    /**
     * @min -2147483648
     * @max 2147483647
     */
    points?: number;
    robot_panel_port: number;
    vs_port: number;
    webots_stream_port: number;
    grades?: any;
    launch_command?: string;
    /**
     * * `CREATED` - Создана
     * * `IN_PROGRESS` - В процессе
     * * `COMPLETED` - Завершена
     * * `QUARANTINE` - В карантине
     * * `CHECKED` - Проверена
     * * `REWORK` - Отправлена на доработку
     */
    status?: StatusEnum;
    user: number;
    problem: number;
    tournament: number;
}

/** Сериализатор для модель соревнования */
export interface ProblemWithImageURL {
    id: number;
    users: User[];
    image: string;
    /** @maxLength 300 */
    title: string;
    /** @maxLength 1000 */
    description?: string | null;
    /** * `webots_ros2_suv` - webots_ros2_suv */
    world_path: WorldPathEnum;
    /** @format double */
    difficulty: number;
    author: number;
}

/**
 * * `CREATED` - Создана
 * * `IN_PROGRESS` - В процессе
 * * `COMPLETED` - Завершена
 * * `QUARANTINE` - В карантине
 * * `CHECKED` - Проверена
 * * `REWORK` - Отправлена на доработку
 */
export enum StatusEnum {
    CREATED = "CREATED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED",
    QUARANTINE = "QUARANTINE",
    CHECKED = "CHECKED",
    REWORK = "REWORK",
}

export interface TokenRefresh {
    access: string;
    refresh: string;
}

/** Сериализатор для модели Соревнование */
export interface Tournament {
    id: number;
    users: User[];
    users_ids: number[];
    /** @maxLength 150 */
    name: string;
    /** @maxLength 5000 */
    description: string;
    /** @format date-time */
    date_start: Date;
    /** @format date-time */
    date_end: Date;
    is_blocked?: boolean;
    problems: number[];
}

/** Сериализатор для модель many-to-many Соревнования-Пользователи */
export interface TournamentUser {
    id: number;
    is_completed?: boolean;
    /**
     * @min -2147483648
     * @max 2147483647
     */
    points?: number;
    user: number;
    tournament: number;
}

export interface User {
    id: number;
    groups: string;
    /** @maxLength 128 */
    password: string;
    /**
     * Superuser status
     * Designates that this user has all permissions without explicitly assigning them.
     */
    is_superuser?: boolean;
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @maxLength 150
     * @pattern ^[\w.@+-]+$
     */
    username: string;
    /** @maxLength 150 */
    first_name?: string;
    /** @maxLength 150 */
    last_name?: string;
    /**
     * Email address
     * @format email
     * @maxLength 254
     */
    email?: string;
    /**
     * Номер телефона
     * @maxLength 18
     */
    phone?: string | null;
    /** @maxLength 50 */
    telegram?: string | null;
    /**
     * Название организации
     * @maxLength 150
     */
    organization?: string | null;
    /**
     * Название команды
     * @maxLength 50
     */
    team?: string | null;
}

export interface UserRegister {
    /**
     * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
     * @maxLength 150
     * @pattern ^[\w.@+-]+$
     */
    username: string;
    /** @maxLength 128 */
    password: string;
    /** @maxLength 150 */
    first_name?: string;
    /** @maxLength 150 */
    last_name?: string;
    /**
     * Email address
     * @format email
     * @maxLength 254
     */
    email?: string;
    /**
     * Номер телефона
     * @maxLength 18
     */
    phone?: string | null;
    /** @maxLength 50 */
    telegram?: string | null;
    /**
     * Название организации
     * @maxLength 150
     */
    organization?: string | null;
    /**
     * Название команды
     * @maxLength 50
     */
    team?: string | null;
}

export interface UserRegisterResponse {
    user_id: number;
    message: string;
}

export interface WBTFileUploadRequest {
    /** Идентификатор турнира, к которому относится файл. */
    tournament_id: number;
    /**
     * Файл с расширением .wbt, который нужно загрузить.
     * @format binary
     */
    file: File;
}

/** * `webots_ros2_suv` - webots_ros2_suv */
export enum WorldPathEnum {
    WebotsRos2Suv = "webots_ros2_suv",
}
