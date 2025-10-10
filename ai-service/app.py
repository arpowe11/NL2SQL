from app import create_app
app = create_app()


# Used for local testing
if __name__ == '__main__':
    app.run(debug=app.config['DEBUG'], host=app.config['HOST'], port=app.config['PORT'])
    