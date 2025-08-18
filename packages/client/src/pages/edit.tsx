import EditorHeader from "./Editor/EditorHeader";
import EditorLeftPanel from "./Editor/EditorLeftPanel";
import EditorRightPanel from "./Editor/EditorRightPanel";

function Editor() {
  return (
    <div className="flex flex-col h-full bg-[#f1f2f4]">
      {/* 头部组件 */}
      <header className="shadow-sm p-4 bg-white">
        <EditorHeader />
      </header>
      <main className="flex flex-1 border overflow-x-hidden">
        {/* 左侧编辑组件 */}
        <div className={`w-80 bg-white px-4 overflow-y-auto`}>
          <EditorLeftPanel />
        </div>
        {/* 中间编辑组件 */}
        <div className="flex-auto flex items-center justify-center">
          <div className="editor-canvas-container w-[380px] h-[700px] bg-white text-left overflow-y-auto overflow-x-hidden">
            中间编辑组件
          </div>
        </div>
        {/* 右侧编辑组件 */}
        <div className={`w-80 bg-white px-4 overflow-y-auto`}>
          <EditorRightPanel />
        </div>
      </main>
    </div>
  );
}
export default Editor;
