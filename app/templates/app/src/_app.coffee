MITHgrid.Application.namespace '<%= projName %>', (test)->
  test.initInstance = (args...)->
    MITHgrid.Application.initInstance 'MITHgrid.Application.<%= projName %>', args... , (that,container)->

      that.ready ->

        MITHgrid.Presentation.Table.initInstance '#students',
          dataView:that.dataView.students
          columns:['name','math','science','english']
          columnLabels:
            name:'Name'
            math:'Math'
            english:'English'
            science:'Science'

        MITHgrid.Presentation.Table.initInstance '#teachers',
          dataView:that.dataView.teachers
          columns:['name','teachs','age']
          columnLabels:
            name:'Name'
            teachs:'Teachs'
            age:'Age'

        _lens = (c,v,m,i)->
          v = $(c).data('count') + 1
          $(c).html(v).data('count',v)


        MITHgrid.Presentation.SimpleText.initInstance '#totalStudents',
          dataView:that.dataView.students
          lenses:
            'student': _lens

        MITHgrid.Presentation.SimpleText.initInstance '#totalTeachers',
          dataView:that.dataView.teachers
          lenses:
            'teacher': _lens

        $('.data').on 'click', (e)->
          url = 'app/data/'+$(this).data('file')+'.json'
          $.ajax 
            url:url
            success: (data)->
              that.dataStore.school.loadItems data.entries


MITHgrid.defaults 'MITHgrid.Application.<%= projName %>', 
  dataStores:
    school:
      types:
        student:{}
        teacher:{}
  dataViews:
    students:
      types:['student']
      dataStore:'school'
    teachers:
      types:['teacher']
      dataStore:'school'



