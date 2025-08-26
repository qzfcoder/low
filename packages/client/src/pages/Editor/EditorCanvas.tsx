import ClassNames from "classnames";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { getComponentByType } from "@lowcode/share";
import type {
  TBasicComponentConfig,
  TComponentPropsUnion,
} from "@lowcode/share";
import { useStoreComponents } from "~/hooks";
import type { TStoreComponents } from "~/store";

// 获取公共组件
export function generateComponent(conf: TBasicComponentConfig) {
  const Component = getComponentByType(conf.type);

  // toJS将mobx装饰过的对象转成普通对象
  return <Component {...toJS(conf.props)} key={conf.id} />;
}

interface ComponentWrapperProps {
  id: string;
  children: ReactNode;
  onClick: () => void;
  isCurrentComponent: boolean;
}

// 公共组件的布局样式组件
const ComponentWrapper: FC<ComponentWrapperProps> = ({
  id,
  children,
  isCurrentComponent,
  onClick,
}) => {
  // 设置选中的组件样式和鼠标hover的样式
  const classNames = useMemo(() => {
    return ClassNames({
      "absolute left-0 top-0 w-full h-full z-[999]": true,
      "hover:border-[3px] hover:border-blue-500": !isCurrentComponent,
      "border-[2px] border-blue-400": isCurrentComponent,
    });
  }, [isCurrentComponent]);

  return (
    <div
      className="relative cursor-pointer component-warpper"
      onClick={onClick}
      data-id={id} // 拖拽排序使用的 id
    >
      <div className={classNames} />
      <div
        className="pointer-events-none" //屏蔽鼠标和键盘操作
      >
        {children}
      </div>
    </div>
  );
};

export interface TEditorCanvasType {
  setShowToolbar: React.Dispatch<React.SetStateAction<boolean>>;
}

// 低代码视图组件
const EditorCanvas: FC<{
  store: TStoreComponents;
}> = observer(({ store }) => {
  const {
    getComponentById,
    isCurrentComponent,
    setCurrentComponent,
    getCurrentComponentConfig,
  } = useStoreComponents();

  // 点击组件设置成选中组件，已选中则不做操作
  function handleComponentClick(conf: TComponentPropsUnion) {
    if (isCurrentComponent(conf)) return;
    setCurrentComponent(conf.id);
  }

  return (
    <>
      {store.sortableCompConfig
        .map((id) => getComponentById(id))
        .map((conf) => {
          return (
            <ComponentWrapper
              id={conf.id}
              key={conf.id}
              onClick={() => handleComponentClick(conf)}
              isCurrentComponent={
                getCurrentComponentConfig.get()?.id === conf.id
              }
            >
              {generateComponent(conf)}
            </ComponentWrapper>
          );
        })}
    </>
  );
});

export default EditorCanvas;
