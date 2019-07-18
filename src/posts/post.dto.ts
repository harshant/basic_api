import { IsString,IsBoolean,IsDate,IsNumber} from 'class-validator';

 
class CreatePostDto {
  @IsString( {
      each: true
  })
  public user: string[];
 
  @IsString()
  public content: string;
 
  @IsString()
  public title: string;

  @IsNumber()
  public number: number;

  @IsBoolean()
  public boolean: boolean;

}
 
export default CreatePostDto;