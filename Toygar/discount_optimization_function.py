def discounting(path_to_historical_sales, max_discount=0.1):
    #Historical sales data should have these columns only: ["Date", "Time", "Sales"]

    import pandas as pd
    
    
    sales_history = pd.read_csv(path_to_historical_sales)
    
    #may delete average sales
    average_sales = sales_history.groupby("time").mean()
    
    total_average_sales = sales_history.mean()

    differences_from_average = (sales_history.groupby("time").mean() - total_average_sales) / sales_history.groupby("time").min()

    discounts = differences_from_average * max_discount
    discounts['Value'] = discounts['Value'].apply(lambda x: max(0, x))

    return discounts







    