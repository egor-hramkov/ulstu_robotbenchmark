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
    /** Сериализатор для модель соревнования */
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
    /**
     * * `webots_ros2_suv` - webots_ros2_suv
     * * `webots_ros2_tesla` - webots_ros2_tesla
     * * `webots_ros2_control` - webots_ros2_control
     * * `webots_ros2_driver` - webots_ros2_driver
     * * `webots_ros2_epuck` - webots_ros2_epuck
     * * `webots_ros2_importer` - webots_ros2_importer
     * * `webots_ros2_mavic` - webots_ros2_mavic
     * * `webots_ros2_msgs` - webots_ros2_msgs
     * * `webots_ros2_tests` - webots_ros2_tests
     * * `webots_ros2_tiago` - webots_ros2_tiago
     * * `webots_ros2_turtlebot` - webots_ros2_turtlebot
     * * `webots_ros2_universal_robot` - webots_ros2_universal_robot
     */
    world_path?: WorldPathEnum;
    /** @format uri */
    image?: string | null;
    /** @format double */
    difficulty?: number;
    author?: number;
}

/** Сериализатор для модели many-to-many Соревнования-Пользователи */
export interface PatchedProblemUser {
    id?: number;
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
    /** @maxLength 150 */
    name?: string;
    /** @maxLength 5000 */
    description?: string;
    /** @format date-time */
    date_start?: Date;
    /** @format date-time */
    date_end?: Date;
    users_ids?: User[];
    problems?: number[];
    is_blocked?: boolean;
}

/** Модель Пользователь-Соревнование (многие ко многим) */
export interface PatchedTournamentUser {
    id?: number;
    user?: number;
    tournament?: number;
    is_completed?: boolean;
    /**
     * @min -2147483648
     * @max 2147483647
     */
    points?: number;
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
}

/** Сериализатор для модель соревнования */
export interface Problem {
    id: number;
    users: User[];
    /** @maxLength 300 */
    title: string;
    /** @maxLength 1000 */
    description?: string | null;
    /**
     * * `webots_ros2_suv` - webots_ros2_suv
     * * `webots_ros2_tesla` - webots_ros2_tesla
     * * `webots_ros2_control` - webots_ros2_control
     * * `webots_ros2_driver` - webots_ros2_driver
     * * `webots_ros2_epuck` - webots_ros2_epuck
     * * `webots_ros2_importer` - webots_ros2_importer
     * * `webots_ros2_mavic` - webots_ros2_mavic
     * * `webots_ros2_msgs` - webots_ros2_msgs
     * * `webots_ros2_tests` - webots_ros2_tests
     * * `webots_ros2_tiago` - webots_ros2_tiago
     * * `webots_ros2_turtlebot` - webots_ros2_turtlebot
     * * `webots_ros2_universal_robot` - webots_ros2_universal_robot
     */
    world_path: WorldPathEnum;
    /** @format uri */
    image?: string | null;
    /** @format double */
    difficulty: number;
    author: number;
}

/** Сериализатор для модели many-to-many Соревнования-Пользователи */
export interface ProblemUser {
    id: number;
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
    /**
     * * `webots_ros2_suv` - webots_ros2_suv
     * * `webots_ros2_tesla` - webots_ros2_tesla
     * * `webots_ros2_control` - webots_ros2_control
     * * `webots_ros2_driver` - webots_ros2_driver
     * * `webots_ros2_epuck` - webots_ros2_epuck
     * * `webots_ros2_importer` - webots_ros2_importer
     * * `webots_ros2_mavic` - webots_ros2_mavic
     * * `webots_ros2_msgs` - webots_ros2_msgs
     * * `webots_ros2_tests` - webots_ros2_tests
     * * `webots_ros2_tiago` - webots_ros2_tiago
     * * `webots_ros2_turtlebot` - webots_ros2_turtlebot
     * * `webots_ros2_universal_robot` - webots_ros2_universal_robot
     */
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

/** Сериализатор для модель соревнования */
export interface Tournament {
    id: number;
    users: User[];
    /** @maxLength 255 */
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
    id?: number;
    groups?: string;
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
     * Phone number
     * @pattern ^\+?[1-9]\d{1,14}$
     */
    phone?: string;
    /** @maxLength 50 */
    telegram?: string;
    /** @maxLength 150 */
    organization?: string;
    /** @maxLength 50 */
    team?: string;
}

/**
 * * `webots_ros2_suv` - webots_ros2_suv
 * * `webots_ros2_tesla` - webots_ros2_tesla
 * * `webots_ros2_control` - webots_ros2_control
 * * `webots_ros2_driver` - webots_ros2_driver
 * * `webots_ros2_epuck` - webots_ros2_epuck
 * * `webots_ros2_importer` - webots_ros2_importer
 * * `webots_ros2_mavic` - webots_ros2_mavic
 * * `webots_ros2_msgs` - webots_ros2_msgs
 * * `webots_ros2_tests` - webots_ros2_tests
 * * `webots_ros2_tiago` - webots_ros2_tiago
 * * `webots_ros2_turtlebot` - webots_ros2_turtlebot
 * * `webots_ros2_universal_robot` - webots_ros2_universal_robot
 */
export enum WorldPathEnum {
    WebotsRos2Suv = "webots_ros2_suv",
    WebotsRos2Tesla = "webots_ros2_tesla",
    WebotsRos2Control = "webots_ros2_control",
    WebotsRos2Driver = "webots_ros2_driver",
    WebotsRos2Epuck = "webots_ros2_epuck",
    WebotsRos2Importer = "webots_ros2_importer",
    WebotsRos2Mavic = "webots_ros2_mavic",
    WebotsRos2Msgs = "webots_ros2_msgs",
    WebotsRos2Tests = "webots_ros2_tests",
    WebotsRos2Tiago = "webots_ros2_tiago",
    WebotsRos2Turtlebot = "webots_ros2_turtlebot",
    WebotsRos2UniversalRobot = "webots_ros2_universal_robot",
}
