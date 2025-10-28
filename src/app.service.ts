import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CreateTodoList } from './todolist-create.dto';
import { UpdateTodoList } from './todolist-update.dto';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Inject(PrismaService)
  private prismaService: PrismaService;

  // 增加分页限制，默认为每页10条，返回第1页
  async query(page: number = 1, pageSize: number = 10) {
    const skip = (page - 1) * pageSize;
    return this.prismaService.movieCorpus.findMany({
      skip,
      take: pageSize,
      select: {
        id: true,
        title: true,
        year: true,
      },
    });
  }

  async create(todoItem: CreateTodoList) {
    return this.prismaService.movieCorpus.create({
      data: todoItem,
      select: {
        id: true,
      },
    });
  }

  /**
   * 这里使用 update 的 where 条件 id_componentCode，
   * 是因为在 Prisma schema/prisma/schema.prisma 文件中，
   * MovieCorpus 表的联合主键是 (id, componentCode)，参见：
   *
   *   @@id([id, componentCode])
   *
   * Prisma 生成的 CRUD 操作会要求 where 条件使用完整的联合主键字段，
   * 也就是 id_componentCode: { id, componentCode } 的结构，
   * 这样才能唯一确定一条记录来进行 update。
   */
  async update(todoItem: UpdateTodoList) {
    return this.prismaService.movieCorpus.update({
      where: {
        id_componentCode: {
          id: todoItem.id,
          componentCode: todoItem.componentCode,
        },
      },
      data: todoItem,
      select: {
        id: true,
      },
    });
  }

  async remove(id: string, componentCode: number) {
    return this.prismaService.movieCorpus.delete({
      where: {
        id_componentCode: {
          id: id,
          componentCode: componentCode,
        },
      },
    });
  }
}
