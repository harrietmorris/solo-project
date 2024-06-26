import React, { useState, useEffect } from "react"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from "react-native"
import { Button, Checkbox, HelperText, TextInput } from "react-native-paper"
import RNDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker"
import { useDataContext } from "../context/MeetsContext"
import { MeetType } from "../type/Types"
import { SafeAreaView } from "react-native-safe-area-context"
import FormStyles from "../styling/components/form"
// import MapComp from "./maps"



type NewMeet = Omit<MeetType, '_id'>;

const Form: React.FC = () => {   
  const {username} = useDataContext();
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const groupOptions = ['Women-only', 'Mixed gender', 'Mothers', 'Seniors', 'Soft-tops','Long-boards', 'Short-boards'];

  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [markerPosition, setMarkerPosition] = useState<{latitude: number, longitude: number}>({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const { control, reset, formState: { errors, isValid, isSubmitSuccessful}, handleSubmit, setValue } = useForm<MeetType>({
    mode: "onChange",
  })

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        organiser: "",
        date: new Date(),
        location: "",
        tags: [],
        description:'',
      })
      setChosenTags([]);
      setMarkerPosition({latitude: 37.78825, longitude: -122.4324});

    }
  }, [isSubmitSuccessful, reset])


  const handleTagChange = (tag :string) => {
    setChosenTags(prevTags => 
      prevTags.includes(tag)
        ?
        prevTags.filter(t => t !== tag)
        : 
        [...prevTags, tag]
    );
      
        setValue("tags", chosenTags)
     
    }
  
  
    const { createMeet, loading, error } = useDataContext();

    const submit: SubmitHandler<MeetType> = async (data) => {
      
      const organiser = username || "Unable to identify user";
      data.organiser = organiser;
      data.tags= chosenTags
      data.location = JSON.stringify(markerPosition);
      await createMeet(data);
      
    };

    const setDate = (event: DateTimePickerEvent, date?: Date) => {
      if (date) {
        setValue("date", date);
      }
    };
  
    
      
    return (

        <SafeAreaView style={FormStyles.container}>
          
          <ScrollView contentContainerStyle={FormStyles.scrollViewContent}>
            
            <Controller
              control={control}
              defaultValue=""
              name="location"
              render={({field: { onChange, onBlur, value }}) => (
                <> 
                  <Text style={FormStyles.text}>Location... </Text>
                  {/* <MapComp
                    initialPosition={markerPosition}
                    onMarkerPositionChanged={setMarkerPosition}
                    /> */}

                  {/* <TextInput mode='outlined' label='Location' style={FormStyles.input} value={value} onBlur={onBlur} onChangeText={onChange} theme={{
                    roundness: 7,
                      colors: {
                        primary: '#D26C22',
                        // background: '#E8C4AE'
                      }, }} textColor={'#4D689D'}/> */}
                  <HelperText type="error">{errors.location?.message}</HelperText>
                </>
              )}
            />

            <Controller
                    control={control}
                    name="date"
                    defaultValue={new Date()}
                    render={({ field: { value } }) => (
                      <>
                      <Text style={FormStyles.text}>Date and Time ... </Text>
                      <RNDateTimePicker style={FormStyles.date} mode="datetime" display="default" onChange={(event, date) => setDate(event, date)} value={value} minimumDate={new Date}/>
                      </>
                    )}
                  />

           
            
            <Controller
              control={control}
              defaultValue={chosenTags}
              name="tags"
              render={({field: { onChange }}) => (
                <> 
      
            <Text style={FormStyles.text}>Skill Level</Text>
                  {skillLevels.map(level => (
                    <Checkbox.Item 
                        key={level}
                        label ={level} 
                        status={chosenTags.includes(level)? 'checked' : 'unchecked'}
                        color="#6893BD" 
                        onPress={() => {
                          handleTagChange(level);
                        }} 
                       
                    />
                  ))}
                   

                </>
              )}
            />


             <Controller
              control={control}
              defaultValue={chosenTags}
              name="tags"
              render={({field: { onChange }}) => (
                <> 
      
              <Text style={FormStyles.text}>Options</Text>
                  {groupOptions.map(type => (
                    <Checkbox.Item 
                        key={type}
                        label ={type} 
                        status={chosenTags.includes(type) ? 'checked' : 'unchecked'}
                        color="#6893BD" 
                        onPress={() => {
                          handleTagChange(type);
                        }}
                      
                    />
                  ))}
                </>
              )}
            />

<Controller
              control={control}
              defaultValue=""
              name="description"
              render={({field: { onChange, onBlur, value }}) => (
                <> 
                  <TextInput mode='outlined' label='Description' style={FormStyles.input} value={value} onBlur={onBlur} onChangeText={onChange} theme={{
               roundness: 7,
               colors: {
                 primary: '#D26C22',
                //  background: 'green'
               }, }} textColor={'#4D689D'}/>
                  <HelperText type="error">{errors.description?.message}</HelperText>
                </>
              )}
            />

            <Button mode="contained" onPress={handleSubmit(submit)} disabled={!isValid}  style={FormStyles.button}>
              Create
            </Button>
            </ScrollView>
        </SafeAreaView>
       
    )
}



export default Form