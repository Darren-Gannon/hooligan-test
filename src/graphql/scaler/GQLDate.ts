import { Scalar, CustomScalar } from '@nestjs/graphql';
import { GraphQLError, Kind } from 'graphql';
import * as assertErr from 'assert-err';

@Scalar('Date')
export class GQLDate implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  /**
   * Serialize date value into string
   * @param  {Date} value date value
   * @return {String} date as string
   */
   serialize (value) {
    assertErr(value instanceof Date, TypeError, 'Field error: value is not an instance of Date')
    assertErr(!isNaN(value.getTime()), TypeError, 'Field error: value is an invalid Date')
    return value.toJSON()
  }
  /**
   * Parse value into date
   * @param  {*} value serialized date value
   * @return {Date} date value
   */
  parseValue (value: any) {
    var date = new Date(value)
    assertErr(!isNaN(date.getTime()), TypeError, 'Field error: value is an invalid Date')
    return date
  }
  /**
   * Parse ast literal to date
   * @param  {Object} ast graphql ast
   * @return {Date} date value
   */
  parseLiteral (ast) {
    assertErr(ast.kind === Kind.STRING,
      GraphQLError, 'Query error: Can only parse strings to dates but got a: ' + ast.kind, [ast])

    var result = new Date(ast.value)
    assertErr(!isNaN(result.getTime()),
      GraphQLError, 'Query error: Invalid date', [ast])
    assertErr(ast.value === result.toJSON(),
      GraphQLError, 'Query error: Invalid date format, only accepts: YYYY-MM-DDTHH:MM:SS.SSSZ', [ast])

    return result
  }
}