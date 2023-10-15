def discounting(path_to_historical_sales, path_to_current_data, item_id="item_0", max_discount=0.3):
    #Historical sales data should have these columns only: ["Date", "Time", "Sales"]

    import pandas as pd
    from xgboost import XGBRegressor
    from sklearn.tree import DecisionTreeRegressor
    import numpy as np
    import tensorflow as tf

    def neural_network_regressor(input_dim, output_dim):
      
        model = tf.keras.Sequential([
          tf.keras.layers.Dense(16, activation='relu', input_shape=(input_dim,)),
          tf.keras.layers.Dense(8, activation='relu'),
          tf.keras.layers.Dense(output_dim)
            ])  
        return model



    sales_history = pd.read_json(path_to_historical_sales)

    
    
    item_sales_history = sales_history[["Date", "Time", "price", "cost", item_id]]


    item_sales_history["profit"] = (item_sales_history["price"] - item_sales_history["cost"]) * item_sales_history[item_id] 



    item_sales_history['is_weekend'] = item_sales_history['Date'].dt.dayofweek.isin([5, 6])


    hour_dummies = pd.get_dummies(item_sales_history['Time'], prefix='hour')
    item_sales_history = pd.concat([item_sales_history, hour_dummies], axis=1)

    item_sales_history = item_sales_history.replace({True: 1, False: 0})

    the_day_to_be_predicted = item_sales_history[-15:]
    item_sales_history = item_sales_history[:15]

    #Using quantity as the target variable
    X_train = item_sales_history[['price', 'cost', 'is_weekend',
       'hour_8', 'hour_9', 'hour_10', 'hour_12', 'hour_13',
       'hour_14', 'hour_17', 'hour_18']]
    
    print(X_train)
    
    y_train = item_sales_history["item_0"]

    X_test = the_day_to_be_predicted[['price', 'cost', 'is_weekend',
       'hour_8', 'hour_9', 'hour_10', 'hour_12', 'hour_13',
       'hour_14', 'hour_17', 'hour_18']]
    
    y_test = the_day_to_be_predicted["item_0"]

    model = neural_network_regressor(11, 1)
    model.compile(optimizer='adam',
              loss='mae')
    model.fit(X_train, y_train, batch_size=4, epochs=40)

    from sklearn.metrics import mean_absolute_error
    y_pred = model.predict(X_train)
    accuracy = mean_absolute_error(y_train, y_pred)


    print(accuracy)


    

    possible_disconuts = [0, 0.05,0.10,0.15,0.20,0.25,0.30]


    profits_w_discounts = pd.DataFrame()


  
    for i in possible_disconuts:
        temp = X_test.copy()
        temp["price"] *= (1-i)
        print(model.predict(temp))
        temp["quan"] = model.predict(temp)
        
        temp["profit"] = temp["quan"] * (temp["price"]- temp["cost"])

        profits_w_discounts[str(i)] = temp["profit"]

        print(profits_w_discounts)


   

    discounts = [0.3,0.1]

    discounts[item_id] = discounts[item_id].apply(lambda x: max(0, x))
    discounts[item_id] = discounts[item_id].apply(lambda x: min(x, max_discount))

    return discounts


discounting("/Volumes/Umut_SSD/Yarışmalar/Compec 2023/dummy_df_sales.json", "item_0")

discounting("/Volumes/Umut_SSD/Yarışmalar/Compec 2023/dummy_df_sales.json", "item_2").to_csv("deneme.csv")




