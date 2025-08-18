import { componentList } from "..";
import type { TBasicComponentConfig, TransformedComponentConfig } from ".";

// 获取组件的入口
export function getComponentByType(type: TBasicComponentConfig["type"]) {
  return componentList[type];
}

// 将组件配置属性的深层对象，转成一维，直接拿到defaultValue值作为配置属性值
export function getDefaultValueByConfig(
  componentPropsWrapper: TransformedComponentConfig<Record<string, any>>
) {
  return Object.entries(componentPropsWrapper).reduce(
    (acc, [key, value]) => {
      acc[key] = value.defaultValue;
      return acc;
    },
    {} as Record<string, any>
  );
}
