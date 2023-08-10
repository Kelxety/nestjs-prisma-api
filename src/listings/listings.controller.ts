import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { CreateListingDto } from './dto/create-listing.dto';
import { UpdateListingDto } from './dto/update-listing.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ListingEntity } from './entities/listing.entity';

@Controller('listings')
@ApiTags('listings')
export class ListingsController {
  constructor(private readonly listingsService: ListingsService) {}

  @Post()
  @ApiCreatedResponse({ type: ListingEntity })
  async create(@Body() createListingDto: CreateListingDto) {
    return new ListingEntity(
      await this.listingsService.create(createListingDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: ListingEntity, isArray: true })
  async findAll() {
    const listings = await this.listingsService.findAll();
    return listings.map((list) => new ListingEntity(list));
  }

  @Get(':id')
  @ApiOkResponse({ type: ListingEntity })
  async findOne(@Param('id') id: string) {
    return new ListingEntity(await this.listingsService.findOne(id));
  }

  @Patch(':id')
  @ApiOkResponse({ type: ListingEntity })
  async update(
    @Param('id') id: string,
    @Body() updateListingDto: UpdateListingDto,
  ) {
    return new ListingEntity(
      await this.listingsService.update(id, updateListingDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ListingEntity })
  async remove(@Param('id') id: string) {
    return new ListingEntity(await this.listingsService.remove(id));
  }
}
