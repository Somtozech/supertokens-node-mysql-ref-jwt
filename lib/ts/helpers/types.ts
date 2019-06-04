export type TypeInputConfig = {
    mysql: {
        host?: string;
        port?: number;
        user: string;
        password: string;
        connectionLimit?: number;
        database: string;
        tables?: {
            signingKey?: string;
            refreshTokens?: string;
        };
    };
    tokens: {
        accessToken?: {
            signingKey?: {
                dynamic?: boolean;
                updateInterval?: number;
                get?: TypeGetSigningKeyUserFunction;
            };
            validity?: number;
        };
        refreshToken: {
            validity?: number;
            renewTokenPath: string;
        };
    };
    logging?: {
        info?: (info: any) => void;
        error?: (err: any) => void;
    };
    cookie: {
        domain: string;
        secure?: boolean;
    };
    onTokenTheftDetection?: (userId: string, sessionHandle: string) => void;
};

export type TypeConfig = {
    mysql: {
        host: string;
        port: number;
        user: string;
        password: string;
        connectionLimit: number;
        database: string;
        tables: {
            signingKey: string;
            refreshTokens: string;
        };
    };
    tokens: {
        accessToken: {
            signingKey: {
                dynamic: boolean;
                updateInterval: number;
                get: TypeGetSigningKeyUserFunction | undefined;
            };
            validity: number;
        };
        refreshToken: {
            validity: number;
            renewTokenPath: string;
        };
    };
    logging: {
        info?: (info: any) => void;
        error?: (err: any) => void;
    };
    cookie: {
        domain: string;
        secure: boolean;
    };
    onTokenTheftDetection: (userId: string, sessionHandle: string) => void;
};

export type TypeGetSigningKeyUserFunction = () => Promise<string>;

export type MySQLParamTypes = string | number | boolean | null | Date;

export type TypeAuthError = {
    errType: number;
    err: any;
};
