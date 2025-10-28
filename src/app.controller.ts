import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateTodoList } from './todolist-create.dto';
import { UpdateTodoList } from './todolist-update.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create')
  async create(@Body() todoItem: CreateTodoList) {
    return this.appService.create(todoItem);
  }

  @Post('update')
  // @Body() 注入请求体
  async update(@Body() todoItem: UpdateTodoList) {
    return this.appService.update(todoItem);
  }

  @Get('delete')
  // @Query() 注入查询参数
  async delete(
    @Query('id') id: string,
    @Query('componentCode') componentCode: number,
  ) {
    return this.appService.remove(id, componentCode);
  }

  @Get('list')
  /**
   * 示例 curl 命令测试该接口:
   * curl "http://localhost:3030/list?page=1&pageSize=10"
   */
  async list(
    @Query('page') page: number = 1,
    @Query('pageSize') pageSize: number = 10,
  ) {
    return this.appService.query(Number(page), Number(pageSize));
  }
}
