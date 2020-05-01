import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { CreateUserDto, CreateUserProfileDto, UpdateUserProfileDto } from './dto/create-user.dto'
import { User, UserProfile } from './classes/user.class'
import { SetSelfReportedPositiveFlagDto } from './dto/set-positive-flag.dto'

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  createOneUser(user: CreateUserDto, userProfile?: CreateUserProfileDto) {
    return this.usersRepository.createOne(user, userProfile)
  }

  async findOneUserById(userId: string): Promise<User | undefined> {
    return this.usersRepository.findOneUserById(userId)
  }

  async findOneUserProfileById(userId: string): Promise<UserProfile | undefined> {
    return this.usersRepository.findOneUserProfileById(userId)
  }

  async uploadPositiveList(): Promise<void> {
    return this.usersRepository.uploadPositiveList()
  }

  async updateUserProfile(updateUserProfileDto: UpdateUserProfileDto): Promise<void> {
    if (updateUserProfileDto.prefecture) {
      await this.usersRepository.updateUserProfilePrefecture(updateUserProfileDto)
    }

    console.log('updateUserProfileDto : ', updateUserProfileDto)

    if (updateUserProfileDto.organizationCode) {
      console.log('updateUserProfileDto.organizationCode : ', updateUserProfileDto.organizationCode)
      // TODO @yashmurty :
      // 2. If `orgCode` exists in payload, check if user already has existing `orgCode`.

      //    A - If existing DB value is empty, check if payload `orgCode` matches any org,
      //        then add it to DB and also add custom claim.

      //    B - If existing DB value is same as payload, do nothing.

      //    C - If existing DB value is different from payload:
      //        - Perform step D defined below (delete org code).
      //        - Then, Perform step A.
    }

    if (updateUserProfileDto.organizationCode === '') {
      console.log('updateUserProfileDto.organizationCode : ', updateUserProfileDto.organizationCode)
      // TODO @yashmurty :
      //    D - If payload value is empty string:
      //        Perform delete operation of `orgCode` for existing user (profile, userStatus, customClaim)
    }

    return
  }

  async setSelfReportedPositiveFlag(
    setSelfReportedPositiveFlag: SetSelfReportedPositiveFlagDto
  ): Promise<void> {
    return this.usersRepository.setSelfReportedPositiveFlag(setSelfReportedPositiveFlag)
  }
}
