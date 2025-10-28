import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from './prisma.service';
import { Inject } from '@nestjs/common';
import { CreateTodoList } from './todolist-create.dto';
import { UpdateTodoList } from './todolist-update.dto';

@Resolver()
export class TodolistResolver {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  @Query('todolist')
  async todolist(
    @Args('page') page: number,
    @Args('pageSize') pageSize: number = 10,
  ) {
    let newPage = Number(page);
    let newPageSize = Number(pageSize);

    return this.prismaService.movieCorpus.findMany({
      skip: (newPage - 1) * newPageSize,
      take: newPageSize,
      select: {
        id: true,
        title: true,
        year: true,
      },
    });
  }

  @Query('queryById')
  async queryById(
    @Args('id') id: string,
    @Args('componentCode') componentCode: number,
  ) {
    return this.prismaService.movieCorpus.findUnique({
      where: {
        id_componentCode: {
          id: id,
          componentCode: componentCode,
        },
      },
    });
  }

  @Mutation('createTodoItem')
  async createTodoItem(@Args('todoItem') todoItem: CreateTodoList) {
    return this.prismaService.movieCorpus.create({
      data: todoItem,
      select: {
        id: true,
        title: true,
        year: true,
      },
    });
  }

  @Mutation('updateTodoItem')
  async updateTodoItem(@Args('todoItem') todoItem: UpdateTodoList) {
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
        title: true,
        movieId: true,
      },
    });
  }

  @Mutation('removeTodoItem')
  async removeTodoItem(
    @Args('id') id: string,
    @Args('componentCode') componentCode: number,
  ) {
    await this.prismaService.movieCorpus.delete({
      where: {
        id_componentCode: {
          id: id,
          componentCode: componentCode,
        },
      },
    });
    return id;
  }
}
