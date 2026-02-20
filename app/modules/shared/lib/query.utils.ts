import type { LocationQuery, RouteParamsGeneric } from "vue-router";

export function getQueryParamString(
  params: LocationQuery,
  key: string,
  defaultValue?: string | undefined,
): string | undefined {
  const value = params[key];

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    if (typeof value[0] === "string") {
      return value[0];
    }
  }

  return defaultValue;
}

export function getQueryParamNumber(
  params: LocationQuery,
  key: string,
  defaultValue?: number,
): number | undefined {
  const rawValue = getQueryParamString(params, key);

  if (rawValue) {
    const parsed = Number.parseFloat(rawValue);

    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return defaultValue;
}

const BOOLEAN_TRUTHY_VALUES = ["true", "1"];
const BOOLEAN_FALSEY_VALUES = ["false", "0"];

export function getQueryParamBoolean(
  params: LocationQuery,
  key: string,
  defaultValue?: boolean,
): boolean | undefined {
  const rawValue = getQueryParamString(params, key);

  if (rawValue) {
    if (BOOLEAN_TRUTHY_VALUES.includes(rawValue)) {
      return true;
    }

    if (BOOLEAN_FALSEY_VALUES.includes(rawValue)) {
      return false;
    }
  }

  return defaultValue;
}
