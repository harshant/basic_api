import { IsString,IsBoolean,IsDate,IsNumber} from 'class-validator';
 
class CreateUserDto {
  @IsString( {
      each: true
  })
  public post: string[];

  @IsNumber()
  public number: number;

  @IsBoolean()
  public boolean: boolean;
 
  @IsString()
  public name: string;
}
 
export default CreateUserDto;