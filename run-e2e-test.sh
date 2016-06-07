cd ../osusume-java-spring
./gradlew build
 OSUSUME_DATABASE_URL=jdbc:postgresql://pivotal:@localhost/osusume-test java -jar applications/api/build/libs/osusume-java-spring-0.0.1-SNAPSHOT.jar &
JAVA_SERVER_PID=$!
cd ../osusume-js

cd e2e-test
java -jar selenium-server-standalone-2.53.0.jar &
SELENIUM_PID=$!
sleep 5

npm install
npm test
TEST_EXIT_STATUS=$?

kill $JAVA_SERVER_PID
kill $SELENIUM_PID

exit $TEST_EXIT_STATUS