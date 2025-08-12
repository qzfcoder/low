import { Injectable } from '@nestjs/common';

@Injectable()
export class MathRandomTool {
  // 生成随机数
  randomCode() {
    return Math.floor(Math.random() * (9999 - 1000) + 1000);
  }

  // 随机生成头像
  randomAvatar() {
    // const baseImgUrl = 'https://picsum.photos/200/300'
    const baseImgUrl = (num: number) => {
      return `https://picsum.photos/200/300?random=${num}`;
    };
    return baseImgUrl(Math.floor(Math.random() * 100));
  }
  // 随机生成昵称
  randomName() {
    const nameList = [
      '张三',
      '李四',
      '王五',
      '赵六',
      '钱七',
      '孙八',
      '周九',
      '吴十',
      '郑十一',
      '冯十二',
    ];
    return nameList[Math.floor(Math.random() * nameList.length)];
  }
}
