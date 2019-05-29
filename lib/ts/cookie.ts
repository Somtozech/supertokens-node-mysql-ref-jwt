import * as express from 'express';

import Config from './config';
import { AuthError, generateError } from './error';

const accessTokenCookieKey = "sAccessToken";
const refreshTokenCookieKey = "sRefreshToken";
const idRefreshTokenCookieKey = "sIdRefreshToken";

/**
 * @description clears all the auth cookies from the response
 */
export function clearSessionFromCookie(res: express.Response) {
    let config = Config.get();
    setCookie(res, accessTokenCookieKey, "", config.cookie.domain,
        config.cookie.secure, true, 0, "/");
    setCookie(res, idRefreshTokenCookieKey, "", config.cookie.domain,
        false, false, 0, "/");
    setCookie(res, refreshTokenCookieKey, "", config.cookie.domain,
        config.cookie.secure, true, 0, config.tokens.refreshToken.renewTokenPath);
}

export function attachAccessTokenToCookie(res: express.Response, token: string, expiry: number) {
    let config = Config.get();
    setCookie(res, accessTokenCookieKey, token, config.cookie.domain,
        config.cookie.secure, true, expiry, "/");
}


export function attachRefreshTokenToCookie(res: express.Response, token: string, expiry: number) {
    let config = Config.get();
    setCookie(res, refreshTokenCookieKey, token, config.cookie.domain,
        config.cookie.secure, true, expiry, config.tokens.refreshToken.renewTokenPath);
}

export function attachIdRefreshTokenToCookie(res: express.Response, token: string, expiry: number) {
    let config = Config.get();
    setCookie(res, idRefreshTokenCookieKey, token, config.cookie.domain,
        false, false, expiry, "/");
}

export function getAccessTokenFromCookie(req: express.Request): string | undefined {
    return getCookieValue(req, accessTokenCookieKey);
}

export function getRefreshTokenFromCookie(req: express.Request): string | undefined {
    return getCookieValue(req, refreshTokenCookieKey);
}

export function getIdRefreshTokenFromCookie(req: express.Request): string | undefined {
    return getCookieValue(req, idRefreshTokenCookieKey);
}

/**
 * @param res 
 * @param key 
 * @param value 
 * @param domain 
 * @param secure 
 * @param httpOnly 
 * @param maxAge 
 * @param path 
 */
export function setCookie(res: express.Response, key: string, value: string, domain: string,
    secure: boolean, httpOnly: boolean,
    expires: number, path: string | undefined) {
    if (path === undefined) {
        path = "/";
    }
    let cookieOptions: express.CookieOptions = {
        domain,
        secure,
        httpOnly,
        expires: new Date(expires),
        path
    };
    res.cookie(key, value, cookieOptions);
}

/**
 * 
 * @param throws AuthError GENERAL_ERROR
 */
export function getCookieValue(req: express.Request, key: string): string | undefined {
    if (req.cookies === undefined) {
        throw generateError(AuthError.GENERAL_ERROR, new Error("did you forget to use cookie-parser middleware?"));
    }
    return req.cookies[key];
}