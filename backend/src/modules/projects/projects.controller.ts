import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../common/enums/role.enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Retrieve published portfolio projects' })
  @ApiQuery({ name: 'roomType', required: false, description: 'Filter by room type (e.g. Living Room, Bedroom)' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category (e.g. Residential, Commercial)' })
  @ApiQuery({ name: 'featured', required: false, description: 'Filter by featured flag (true/false)' })
  findAll(
    @Query('roomType') roomType?: string,
    @Query('category') category?: string,
    @Query('featured') featured?: string,
  ) {
    return this.projectsService.findAll({ roomType, category, featured });
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Retrieve single project by unique slug' })
  @ApiResponse({ status: 200, description: 'Project details' })
  @ApiResponse({ status: 404, description: 'Project not found' })
  findBySlug(@Param('slug') slug: string) {
    return this.projectsService.findBySlug(slug);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Retrieve single project by ID' })
  findById(@Param('id') id: string) {
    return this.projectsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new interior design project (Admin only)' })
  @ApiResponse({ status: 201, description: 'Project created successfully' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update existing project (Admin only)' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete project (Admin only)' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}

