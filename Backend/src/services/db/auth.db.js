import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { UserTable } from "../../drizzle/schema.js";
// for create one as well as create many
export const dbServiceCreate = async (model, data) => {
  console.log("model", model);
  try {
    const result = await db.insert(model).values(data).returning();
    console.log("result", result);
    if (result) {
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      "Error in Create function in dbservices",
      error.message ? error.message : error
    );
  }
};

export const dbServiceFindByEmail = async (email) => {
  try {
    const result = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email))
      .limit(1);
    console.log("result", result);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      "Error in Create function in dbservices",
      error.message ? error.message : error
    );
  }
};

export const dbServiceFindByID = async (id) => {
    try {
      const result = await db
        .select()
        .from(UserTable)
        .where(eq(UserTable.id, id))
        .limit(1);
      console.log("result", result);
      if (result && result.length > 0) {
        return result[0];
      } else {
        return false;
      }
    } catch (error) {
      console.log(
        "Error in Create function in dbservices",
        error.message ? error.message : error
      );
    }
  };
  

export const authDBUpdateOne = async (data,id) => {
  try {
    const result = await db.update(UserTable).set(data).where(eq(UserTable.id,id));
    console.log("result", result);
    if (result && result.length > 0) {
      return result[0];
    } else {
      return false;
    }
  } catch (error) {
    console.log(
      "Error in Create function in dbservices",
      error.message ? error.message : error
    );
  }
};
